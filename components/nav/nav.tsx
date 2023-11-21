import Link from "next/link"

interface NavLinks {
  title: string
}

const navLinks: NavLinks[] = [
  {
    title: "Home",
  },
  {
    title: "Nav Item",
  },
  {
    title: "Nav Item",
  },
]

export default function NavBar() {
  return (
    <>
      <nav className={``}>
        {navLinks.map((link, i) => (
          <Link
            key={i}
            href={
              link.title === "Home"
                ? `/${link.title.split(" ").join("").toLowerCase()}`
                : `/${link.title.split(" ").join("").toLowerCase()}${i}`
            }
            className={link.title === "Home" ? `` : ``}
          >
            {link.title === "Home" ? link.title : `${link.title} ${i + 1}`}
          </Link>
        ))}
      </nav>
    </>
  )
}
