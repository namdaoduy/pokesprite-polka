import ResultCanvas from "./ResultCanvas";

export default function Result() {
  return (
    <div>
      <div className="border-2 rounded-xl w-fit h-fit overflow-hidden">
        <ResultCanvas />
      </div>
    </div>
  )
}