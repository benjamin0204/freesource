"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
export const BreadCrumb = () => {
  const pathname = usePathname();
  const list = pathname.split("/").filter(Boolean); // no empty strings

  return list.length === 0 ? (
    <></>
  ) : (
    <section className="container grid items-center  pb-8 mt-4 ">
      <Breadcrumb>
        <BreadcrumbList>
          {list.map((item, index) => {
            const isLast = index === list.length - 1;
            const href = `/${list.slice(0, index + 1).join("/")}`;
            item = item.replace("%20", " ");

            return (
              <>
                <BreadcrumbItem key={index}>
                  {isLast ? (
                    item
                  ) : (
                    <BreadcrumbLink href={href}>{item}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </section>
  );
};
