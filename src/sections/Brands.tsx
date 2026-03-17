import { motion } from 'framer-motion';

interface Brand {
  name: string;
  logo?: string;
}

const brands: Brand[] = [
  { name: 'Playhouse Agency', logo: '/images/brands/playhouse.png' },
  { name: 'Burger Factory', logo: '/images/brands/burgerfactory.png' },
  { name: 'Body Groove', logo: '/images/brands/bodygroove.png' },
  { name: 'ChocoBOOST', logo: '/images/brands/chocoboost.png' },
  { name: 'Crafty by Numbers', logo: '/images/brands/craftybynumbers.png' },
  { name: 'Mothers Earth', logo: '/images/brands/mothersearthc.png' },
  { name: 'Luxe', logo: '/images/brands/Luxe.png' },
  { name: 'TE', logo: '/images/brands/te.png' },
];

function BrandItem({ brand }: { brand: Brand }) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center mx-6 sm:mx-8 lg:mx-12">
      {brand.logo ? (
        <img
          src={brand.logo}
          alt={brand.name}
          className="h-6 sm:h-8 lg:h-10 w-auto opacity-40 hover:opacity-70 transition-opacity select-none"
          draggable={false}
        />
      ) : (
        <span className="text-base sm:text-xl lg:text-2xl font-semibold text-white/30 whitespace-nowrap select-none">
          {brand.name}
        </span>
      )}
    </div>
  );
}

function TickerRow({ items, direction = 'left' }: { items: Brand[]; direction?: 'left' | 'right' }) {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="flex overflow-hidden">
      <div
        className={direction === 'left' ? 'animate-ticker-left' : 'animate-ticker-right'}
        style={{ display: 'flex' }}
      >
        {repeated.map((brand, i) => (
          <BrandItem key={i} brand={brand} />
        ))}
      </div>
    </div>
  );
}

export default function Brands() {
  const firstRow = brands.slice(0, Math.ceil(brands.length / 2));
  const secondRow = brands.slice(Math.ceil(brands.length / 2));

  return (
    <section className="relative py-12 lg:py-16 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium">
          Trusted by brands & agencies
        </p>
      </motion.div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

        {/* Mobile: two rows scrolling opposite directions */}
        <div className="sm:hidden space-y-4">
          <TickerRow items={firstRow} direction="left" />
          <TickerRow items={secondRow} direction="right" />
        </div>

        {/* Desktop: single row */}
        <div className="hidden sm:block">
          <TickerRow items={brands} direction="left" />
        </div>
      </div>
    </section>
  );
}
