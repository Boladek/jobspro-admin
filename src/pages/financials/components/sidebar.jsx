import { links } from "./links";
import { LinkElement } from "./link-element";

export function SideBar() {
  return (
    <div className="grid grid-cols-1 gap-8">
      {links.map((link) => (
        <LinkElement key={link.title} link={link} />
      ))}
    </div>
  );
}
