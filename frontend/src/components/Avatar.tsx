export default function Avatar({ name, size }: { name: string; size: string }) {
  return (
    <div
      className={`bg-black 
      ${size === "big" ? "w-8" : "w-6"} 
      ${size === "big" ? "h-8" : "h-6"}  
      rounded-2xl text-white flex justify-center flex-col items-center`}
    >
      <p className={`text-${size === "big" ? "xl" : "xs"} mt-0 pt-0`}>
        {name[0].toUpperCase()}
      </p>
    </div>
  );
}
