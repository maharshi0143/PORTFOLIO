import FadeContent from "../../reactbits/FadeContent";

const SectionHeading = ({ title, highlight, subtitle, light = false }) => {
  return (
    <FadeContent className="text-center mb-16">
      <h2 className={`text-5xl md:text-6xl font-heading font-bold mb-4 ${light ? "text-gray-900" : "text-white"}`}>
        {title} <span className="text-primary">{highlight}</span>
      </h2>
      {subtitle && (
        <p className={`text-lg md:text-xl font-semibold max-w-2xl mx-auto ${light ? "text-gray-700" : "text-gray-400"}`}>
          {subtitle}
        </p>
      )}
    </FadeContent>
  );
};

export default SectionHeading;
