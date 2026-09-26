import Image from "next/image";

type Trait = { label: string; score: number };

function Dots({ score }: { score: number }) {
  return (
    <span
      role="img"
      aria-label={`${score} of 5`}
      className="inline-flex gap-[3px] align-middle"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <i
          key={i}
          className={`size-[7px] rounded-full border-[1.5px] border-current ${
            i < score ? "bg-current" : ""
          }`}
        />
      ))}
    </span>
  );
}

function GameCard({
  title,
  description,
  image,
  url,
  domain,
  cat,
  theme,
}: {
  title: string;
  description?: string;
  image: { src: string; alt: string; width: number; height: number };
  url: string;
  domain: string;
  cat: {
    name: string;
    photo: string;
    photoAlt: string;
    bio: string;
    traits: Trait[];
  };
  theme: {
    card: string;
    ink: string;
    muted: string;
    rule: string;
    button: string;
  };
}) {
  return (
    <article
      className={`flex flex-col gap-4 rounded-2xl p-3 pb-5 ${theme.card}`}
    >
      <a href={url} className="block overflow-hidden rounded-lg">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="w-full h-auto"
        />
      </a>
      <div className="px-1.5">
        <h3 className="font-extrabold text-2xl tracking-[3px] uppercase leading-tight">
          <a href={url} className="no-underline">
            {title}
          </a>
        </h3>
        {description && (
          <p className="mt-2 leading-[1.5em]">{description}</p>
        )}
      </div>
      <a
        href={url}
        className={`mx-1.5 rounded-full px-4 py-3 text-center font-bold text-sm tracking-[1px] uppercase no-underline hover:underline ${theme.button}`}
      >
        Play at {domain} ▸
      </a>
      <div
        className={`mx-1.5 mt-auto flex flex-col gap-2 border-t pt-4 ${theme.rule}`}
      >
        <div className="grid grid-cols-[52px_1fr] gap-3 items-start">
          <Image
            src={cat.photo}
            alt={cat.photoAlt}
            width={120}
            height={120}
            className="w-full aspect-square rounded-full object-cover"
          />
          <p className={`text-[13px] leading-[1.5em] ${theme.muted}`}>
            <b className={`font-bold ${theme.ink}`}>Starring {cat.name}.</b>{" "}
            {cat.bio}
          </p>
        </div>
        <p
          className={`flex flex-wrap gap-x-3.5 gap-y-1 pl-16 text-[11px] ${theme.muted}`}
        >
          {cat.traits.map((t) => (
            <span key={t.label} className="whitespace-nowrap">
              <b className="font-bold text-[10px] tracking-[1.5px] uppercase">
                {t.label}
              </b>{" "}
              <Dots score={t.score} />
            </span>
          ))}
        </p>
      </div>
    </article>
  );
}

function PluginItem({
  title,
  description,
  imageUrl,
  url,
}: {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
}) {
  return (
    <a
      href={url}
      className="group grid content-start grid-cols-2 md:grid-cols-1 gap-3 md:gap-2 items-center md:items-start no-underline"
    >
      <Image
        src={imageUrl}
        alt=""
        width={800}
        height={400}
        className="w-full aspect-[2/1] object-cover rounded-md border border-zinc-200 group-hover:outline-3 outline-zinc-900 -outline-offset-2"
      />
      <div>
        <h3 className="font-bold text-sm tracking-[1px] uppercase group-hover:underline">
          {title}
        </h3>
        <p className="text-sm text-zinc-600 leading-[1.4em]">{description}</p>
      </div>
    </a>
  );
}

function FooterLinks({ links }: { links: { title: string; url: string }[] }) {
  return links.map((link, i) => (
    <span key={link.url}>
      {i > 0 && <span className="mx-2 text-zinc-300">·</span>}
      <a className="underline underline-offset-2" href={link.url}>
        {link.title}
      </a>
    </span>
  ));
}

export default function Home() {
  return (
    <div className="max-w-200 w-full px-4 mx-auto py-0">
      <h1 className="text-2xl md:text-3xl leading-[150%] my-12 md:my-20 italic tracking-[3px] relative">
        <span className="absolute -left-16">👋</span>
        I&apos;m <span className="font-bold">Golf Sinteppadon</span>
      </h1>

      <section>
        <h2 className="font-extrabold text-sm tracking-[5px] uppercase mb-4">
          Escape Cats · two browser games
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GameCard
            title="Hex Clicker"
            description="Pet Hex, build a mouse empire, and find out what Hex is dreaming about."
            image={{
              src: "/hex-clicker.png",
              alt: "Hex the black cat over a pink polka-dot sky, with the upgrade shop open below",
              width: 1280,
              height: 720,
            }}
            url="https://hexxygon.com/"
            domain="hexxygon.com"
            cat={{
              name: "Hex",
              photo: "/hex.jpg",
              photoAlt: "Hex, a black and white tuxedo cat, lying on a mat",
              bio: "Tuxedo. Looks classy, yowls before every jump, and will cross the house for a neon mouse. We never know what she's thinking. Probably nothing.",
              traits: [
                { label: "Vocal", score: 5 },
                { label: "Zoomies", score: 4 },
                { label: "Brains", score: 1 },
                { label: "Thoughts", score: 0 },
              ],
            }}
            theme={{
              card: "bg-[#f4c3c5] text-[#2a1719]",
              ink: "text-[#2a1719]",
              muted: "text-[#2a1719]/65",
              rule: "border-[#2a1719]/15",
              button: "bg-[#2a1719] text-white",
            }}
          />
          <GameCard
            title="Goomba Glider"
            description="Line Rider inspired puzzle game. Help Goomba water the plants."
            image={{
              src: "/goomba-glider.png",
              alt: "Goomba the orange cat on a board, with a watering can and a potted plant against a night sky",
              width: 1280,
              height: 720,
            }}
            url="https://g00.mba/"
            domain="g00.mba"
            cat={{
              name: "Goomba",
              photo: "/goomba.jpg",
              photoAlt: "Goomba, a brown tabby cat, looking up at the camera",
              bio: "Brown tabby. A very agile cat who can jump to any shelf or ledge, and has a penchant for eating houseplants. Exhibits human emotions like longing and jealousy.",
              traits: [
                { label: "Cuddly", score: 5 },
                { label: "Agility", score: 5 },
                { label: "Houseplants", score: 5 },
                { label: "Spite", score: 5 },
              ],
            }}
            theme={{
              card: "bg-[#1c1030] text-[#f2eaff]",
              ink: "text-[#f2eaff]",
              muted: "text-[#f2eaff]/65",
              rule: "border-[#f2eaff]/15",
              button: "bg-[#4fd1c5] text-[#12091f]",
            }}
          />
        </div>
      </section>

      <section className="mt-14 md:mt-20 mb-12">
        <h2 className="font-extrabold text-sm tracking-[5px] uppercase mb-4">
          Games built as Figma Plugins
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <PluginItem
            title="Figmaland"
            description="A multiplayer pixel world with a petting zoo, hide and seek and go karts"
            imageUrl="/figmaland.png"
            url="https://www.figma.com/community/widget/1117473220251961046/Interactive-Figmaland"
          />
          <PluginItem
            title="100 Race"
            description="A platformer race for up to 100 people in one file"
            imageUrl="/figma-100-race.png"
            url="https://www.figma.com/community/plugin/983446464948439880/100-Race"
          />
          <PluginItem
            title="Zelda Maker"
            description="Draw a Zelda world on the canvas, then play it"
            imageUrl="/figma-zelda-maker.png"
            url="https://www.figma.com/community/plugin/846537436529611787/Zelda-Maker"
          />
          <PluginItem
            title="Asteroids"
            description="The arcade game, playable with friends inside Figma"
            imageUrl="/figma-asteroids.png"
            url="https://www.figma.com/community/plugin/916835579596798269/Figma-Asteroids"
          />
        </div>
      </section>

      <footer className="border-t border-zinc-200 pt-6 pb-12 text-sm text-zinc-500 flex flex-wrap justify-between gap-x-8 gap-y-3">
        <p>
          Other projects:{" "}
          <FooterLinks
            links={[
              { title: "Gfychess", url: "https://www.gfychess.com/" },
              { title: "Winsome", url: "https://www.winsomewood.com/" },
              {
                title: "Seattle Band Map",
                url: "https://www.seattlebandmap.com/",
              },
            ]}
          />
        </p>
        <p>
          <FooterLinks
            links={[
              {
                title: "LinkedIn",
                url: "https://www.linkedin.com/in/golfsinteppadon/",
              },
              { title: "Github", url: "https://github.com/minigolf2000/" },
              { title: "Figma", url: "https://figma.com/@minigolf2000/" },
            ]}
          />
        </p>
      </footer>
    </div>
  );
}
