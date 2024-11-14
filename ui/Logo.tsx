import Keyframes from "@/components/svg/Keyframes";

export default function Logo() {
  return (
    <div
      className={`flex flex-row items-center leading-none gap-2 text-blue-400`}
    >
      <Keyframes width={36} height={36} />
      <p className="text-[26px] font-bold">Comercio</p>
    </div>
  );
}
