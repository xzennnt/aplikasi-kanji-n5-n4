type ProgressBarProps = {
  value: number;
  label?: string;
};

export default function ProgressBar({ value, label }: ProgressBarProps) {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 text-sm font-medium text-zinc-600">
        <span>{label ?? "Progress"}</span>
        <span>{safeValue}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-stone-200">
        <div className="h-full rounded-full bg-vermilion transition-all" style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}
