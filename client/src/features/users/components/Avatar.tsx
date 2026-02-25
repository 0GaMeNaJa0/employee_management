interface AvatarProps {
  initials: string;
  color: string;
  size?: number;
}
 
export function Avatar({ initials, color, size = 9 }: AvatarProps) {
  return (
    <div
      className={`w-${size} h-${size} rounded-xl flex items-center justify-center font-bold text-xs select-none flex-shrink-0`}
      style={{
        background: `${color}22`,
        border: `1.5px solid ${color}55`,
        color,
        width: `${size * 4}px`,
        height: `${size * 4}px`,
      }}
    >
      {initials}
    </div>
  );
}