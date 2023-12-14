import Link from "next/link";

export interface LinkProps {
  href: string;
  image?: string;
  icon?: React.ReactNode;
  title: string;
  id?: string;
}

const LinkHref: React.FC<LinkProps> = ({ href, image, icon, title }) => {
  return (
    <Link
      href={href}
      className="flex gap-3 items-center p-[7px] rounded-md transition-all hover:bg-[#313339]"
    >
      <div>
        {image ? (
          <img src={image} alt={title} className="w-9 h-9 rounded-full" />
        ) : (
          icon
        )}
      </div>
      <div>
        <p className="text-gray-400">{title}</p>
      </div>
    </Link>
  );
};

export default LinkHref;
