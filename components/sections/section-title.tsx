import { SectionTitleProps } from "@/types/sections"
export default function SectionTitle({ title, color, subtitle }: SectionTitleProps) {
    return (
      <div className="text-center mb-4">
        <h2 className={`text-4xl text-center font-bold my-6 relative py-8
          after:content-[''] after:block after:w-24 after:h-1 
          after:mx-auto after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2`}
          style={{ '--title-underline-color': color } as React.CSSProperties}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg text-gray-600">
            {subtitle}
          </p>
        )}
      </div>
    )
  }