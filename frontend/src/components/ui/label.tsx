interface LabelProps {
  title: string;
  subtitle: string;
  htmlFor: string;
}

const Label: React.FC<LabelProps> = ({ title, subtitle, htmlFor }) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={htmlFor}
        className="text-xl font-medium text-zinc-700"
      >
        {title}
        <span className="mt-0.5 block text-base font-normal text-zinc-500">
          {subtitle}
        </span>
      </label>
    </div>
  )
}

export { Label }