import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { getNurses } from "@/services/nurses";
import { useQuery } from "@tanstack/react-query";
import { CommandList, Command as CommandPrimitive } from "cmdk";
import { X } from "lucide-react";
import { useCallback, useRef, useState } from "react";

type Props = {
  value: number[];
  onChange: (nurses: number[]) => void;
};

function NurseSelector({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { data: nursesData } = useQuery({
    queryKey: ["nurses"],
    queryFn: () => getNurses(),
  });
  const [selectedNurses, setSelectedNurses] = useState<number[]>(value);

  const handleUnselect = useCallback(
    (nurseId: number) => {
      setSelectedNurses((prevSelectedNurses) =>
        prevSelectedNurses.filter((s) => s !== nurseId)
      );
      onChange(selectedNurses.filter((s) => s !== nurseId));
    },
    [onChange, selectedNurses]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelectedNurses((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  const selectables = nursesData?.filter(
    (nurseData) => !selectedNurses.includes(nurseData.ID)
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible h-auto w-full rounded-md border border-input bg-transparent text-sm shadow-sm"
    >
      <CommandList>
        <div className="group px-1 text-sm focus:ring-0 focus:outline-none rounded-md">
          {selectedNurses.map((nurseId) => {
            const nurse = nursesData?.find((s) => s.ID === nurseId);
            if (!nurse) return null;
            return (
              <Badge key={nurse.ID} variant="secondary" className="m-1">
                {nurse.Name}
                <button
                  className="ml-1 rounded-full outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(nurseId);
                    }
                  }}
                  onClick={() => handleUnselect(nurseId)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select Nurses..."
            className="px-3 py-1 h-9 w-full"
          />
        </div>
        {open && (selectables?.length ?? 0) > 0 ? (
          <div
            className="relative"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <div className="absolute text-black w-full h-auto overflow-hidden z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto relative">
                {selectables?.map((nurse) => {
                  return (
                    <CommandItem
                      key={nurse.ID}
                      onSelect={() => {
                        setInputValue("");
                        setSelectedNurses((prev) => [...prev, nurse.ID]);
                        onChange([...selectedNurses, nurse.ID]);
                      }}
                      className={"cursor-pointer"}
                    >
                      {nurse.Name}
                    </CommandItem>
                  );
                })}
                {selectedNurses.length > 0 && (
                  <CommandItem
                    onSelect={() => {
                      setSelectedNurses([]);
                      onChange([]);
                    }}
                    className="justify-center text-center cursor-pointer sticky bottom-0 bg-gray-100 text-sm"
                  >
                    Remove All
                  </CommandItem>
                )}
              </CommandGroup>
            </div>
          </div>
        ) : null}
      </CommandList>
    </Command>
  );
}

export default NurseSelector;
