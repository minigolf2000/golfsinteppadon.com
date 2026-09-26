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
        className={`mx-1.5 rounded-full px-4 py-3 text-center font-bold text-sm tracking-[1px] uppercase no-underline transition-colors duration-150 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#ff3d8b] ${theme.button}`}
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
      className="grid content-start grid-cols-[128px_1fr] md:grid-cols-1 items-stretch md:items-start overflow-hidden rounded-xl bg-[#17161d] no-underline transition duration-150 hover:-translate-y-0.5 hover:bg-[#1f1e27] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#f4f2f7] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <Image
        src={imageUrl}
        alt=""
        width={800}
        height={400}
        className="w-full h-full min-h-16 object-cover object-left-bottom md:h-auto md:aspect-[2/1]"
      />
      <div className="self-center px-3 py-2.5 md:px-3.5 md:pt-3 md:pb-4">
        <h3 className="font-bold text-sm tracking-[1px] uppercase">
          {title}
        </h3>
        <p className="text-sm text-[#a9a6b3] leading-[1.4em]">{description}</p>
      </div>
    </a>
  );
}

function FooterLinks({ links }: { links: { title: string; url: string }[] }) {
  return links.map((link, i) => (
    <span key={link.url}>
      {i > 0 && <span className="mx-2 text-[#4a4854]">·</span>}
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
        <span className="font-bold">Golf Sinteppadon</span>
      </h1>

      <section>
        <h2 className="font-extrabold text-sm tracking-[5px] uppercase mb-4">
          Escape Cats Browser Games
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GameCard
            title="Hex Clicker"
            description="Pet Hex, build a mouse empire, and find out what Hex is dreaming about."
            image={{
              src: "/hex-clicker.png",
              alt: "Hex the black cat over a pink polka-dot sky, with the upgrade shop open below",
              width: 1600,
              height: 900,
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
              button:
                "bg-[#2a1719] text-white hover:bg-[#ff3d8b] hover:text-white",
            }}
          />
          <GameCard
            title="Goomba Glider"
            description="A Line Rider–inspired puzzle game. Help Goomba water the plant."
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
              bio: "Brown tabby. Can jump to any shelf, and has a penchant for eating houseplants. Exhibits human emotions like longing and jealousy.",
              traits: [
                { label: "Cuddly", score: 5 },
                { label: "Agility", score: 5 },
                { label: "Houseplants", score: 5 },
                { label: "Spite", score: 5 },
              ],
            }}
            theme={{
              card: "bg-[#1c1030] text-[#f2eaff] ring-1 ring-[#33245a]",
              ink: "text-[#f2eaff]",
              muted: "text-[#f2eaff]/65",
              rule: "border-[#f2eaff]/15",
              button:
                "bg-[#4fd1c5] text-[#12091f] hover:bg-[#ffd23f] hover:text-[#12091f]",
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
            description="Platforming racer with up to 100 people"
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

      <footer className="border-t border-[#2a2833] pt-6 pb-12 text-sm text-[#8d8a97] flex flex-wrap justify-between gap-x-8 gap-y-3">
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
