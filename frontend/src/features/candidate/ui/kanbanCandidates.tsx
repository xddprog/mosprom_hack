import { GripVertical } from "lucide-react";
import * as React from "react";
import * as Kanban from "@/shared/ui/kanban/kanban";
import { Badge } from "@/shared/ui/badge/ui/badge";
import { Button } from "@/shared/ui";
import { Candidate } from "@/entities/candidate/types/types";

const COLUMN_TITLES: Record<string, string> = {
  inReview: "На рассмотрении",
  screening: "Скриннинг",
  interview: "Интервью",
  offer: "Оффер",
  rejected: "Отказ",
};

export const KanbanCandidates = ({
  columns,
}: {
  columns: Record<string, Candidate[]>;
  onCandidateClick: (candidate: Candidate) => void;
}) => {
  const [candidatesColumns, setCandidatesColumns] =
    React.useState<Record<string, Candidate[]>>(columns);

  return (
    <Kanban.Root
      value={candidatesColumns}
      onValueChange={setCandidatesColumns}
      getItemValue={(item) => item.id}
    >
      <Kanban.Board className="grid auto-rows-fr sm:grid-cols-5">
        {Object.entries(columns).map(([columnValue, tasks]) => (
          <Kanban.Column key={columnValue} value={columnValue}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">
                  {COLUMN_TITLES[columnValue]}
                </span>
                <Badge
                  variant="secondary"
                  className="pointer-events-none rounded-sm"
                >
                  {tasks.length}
                </Badge>
              </div>
              <Kanban.ColumnHandle asChild>
                <Button variant="ghost" size="icon">
                  <GripVertical className="h-4 w-4" />
                </Button>
              </Kanban.ColumnHandle>
            </div>
            <div className="flex flex-col gap-2 p-0.5  overflow-y-auto">
              {tasks.map((task) => (
                <Kanban.Item key={task.id} value={task.id} asHandle asChild>
                  <div className="rounded-md border bg-card p-3 shadow-xs">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="line-clamp-1 font-medium text-sm">
                          {task.title}
                        </span>
                        <Badge
                          variant={
                            task.priority === "high"
                              ? "destructive"
                              : task.priority === "medium"
                              ? "default"
                              : "secondary"
                          }
                          className="pointer-events-none h-5 rounded-sm px-1.5 text-[11px] capitalize"
                        >
                          {task.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-muted-foreground text-xs">
                        {task.assignee && (
                          <div className="flex items-center gap-1">
                            <div className="size-2 rounded-full bg-primary/20" />
                            <span className="line-clamp-1">
                              {task.assignee}
                            </span>
                          </div>
                        )}
                        {task.dueDate && (
                          <time className="text-[10px] tabular-nums">
                            {task.dueDate}
                          </time>
                        )}
                      </div>
                    </div>
                  </div>
                </Kanban.Item>
              ))}
            </div>
          </Kanban.Column>
        ))}
      </Kanban.Board>
      <Kanban.Overlay>
        <div className="size-full rounded-md bg-primary/10" />
      </Kanban.Overlay>
    </Kanban.Root>
  );
};
