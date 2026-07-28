'use client';

import Image from 'next/image';
import { useEffect, useRef, type RefObject } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';

const ease = [0.22, 1, 0.36, 1] as const;

const videoSrc = '/aplicativos/verde-vida.mp4';

const devicesContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.22,
      delayChildren: 0.15,
    },
  },
};

const deviceAnimation: Variants = {
  hidden: { opacity: 0, y: 90 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
      ease,
    },
  },
};

type DeviceVideoProps = {
  className: string;
  radiusClassName?: string;
  videoRef: RefObject<HTMLVideoElement | null>;
};

function DeviceVideo({
  className,
  radiusClassName = 'rounded-[10px]',
  videoRef,
}: DeviceVideoProps) {
  return (
    <div
      className={`pointer-events-none absolute z-20 overflow-hidden bg-black ${radiusClassName} ${className} `}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-fill"
        muted
        loop
        playsInline
        preload="auto"
        poster="/aplicativos/poster-verde-vida.png"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
}

export default function AplicativosHero() {
  const t = useTranslations('AplicativosPage.hero');
  const sectionRef = useRef<HTMLElement | null>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  /* Paralaxe: a foto sobe mais devagar que a página. O `scale` extra existe
     para o deslocamento nunca revelar a borda de baixo da imagem. */
  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ['start start', 'end start'],
  });
  const bannerY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);

  const totemVideoRef = useRef<HTMLVideoElement | null>(null);
  const computerVideoRef = useRef<HTMLVideoElement | null>(null);
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);
  const laptopVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    const videos = [
      totemVideoRef.current,
      computerVideoRef.current,
      mobileVideoRef.current,
      laptopVideoRef.current,
    ].filter((video): video is HTMLVideoElement => Boolean(video));

    if (!section || videos.length === 0) return;

    let isCancelled = false;
    let hasPrepared = false;

    function prepareVideos() {
      videos.forEach((video) => {
        video.muted = true;
        video.volume = 0;
        video.pause();
        video.currentTime = 0;
      });
    }

    function waitUntilVideosCanPlay() {
      return Promise.all(
        videos.map((video) => {
          if (video.readyState >= 3) {
            return Promise.resolve();
          }

          return new Promise<void>((resolve) => {
            const handleCanPlay = () => {
              video.removeEventListener('canplay', handleCanPlay);
              video.removeEventListener('canplaythrough', handleCanPlay);
              resolve();
            };

            video.addEventListener('canplay', handleCanPlay);
            video.addEventListener('canplaythrough', handleCanPlay);

            video.load();
          });
        }),
      );
    }

    function playVideos() {
      requestAnimationFrame(() => {
        videos.forEach((video) => {
          video.muted = true;
          video.volume = 0;
          video.play().catch(() => {});
        });
      });
    }

    async function startOrResumeVideos() {
      if (isCancelled) return;

      if (!hasPrepared) {
        hasPrepared = true;

        prepareVideos();

        await waitUntilVideosCanPlay();

        if (isCancelled) return;

        videos.forEach((video) => {
          video.currentTime = 0;
        });
      }

      playVideos();
    }

    function pauseVideos() {
      videos.forEach((video) => {
        video.pause();
      });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startOrResumeVideos();
        } else {
          pauseVideos();
        }
      },
      {
        threshold: 0.25,
      },
    );

    observer.observe(section);

    return () => {
      isCancelled = true;
      observer.disconnect();
      pauseVideos();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full">
      <div
        ref={bannerRef}
        className="relative h-[clamp(240px,34vh,360px)] w-full overflow-hidden rounded-b-[clamp(24px,3vw,44px)]"
      >
        <motion.div style={{ y: bannerY }} className="absolute inset-0 scale-[1.16]">
          <Image
            src="https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/Granlote_Boituva_Beach_Tennis_Fire_Place_B_HR.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Scrim escuro: garante leitura do título em cima de qualquer render,
            claro ou escuro, sem depender da cor do tema. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.45) 38%, rgba(0,0,0,0.05) 72%, transparent 100%)',
          }}
        />

        {/* Título dentro da imagem, alinhado à esquerda: o serviço se apresenta
            sobre a própria obra, não numa faixa separada acima dela. */}
        <div className="absolute inset-x-0 bottom-0 z-10 mx-auto w-full max-w-[1800px] px-6 pb-[clamp(26px,4vh,44px)] md:px-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="flex items-center gap-[12px] font-['Outfit'] text-[clamp(0.66rem,0.8vw,0.78rem)] font-semibold tracking-[0.3em] text-white/75 uppercase"
          >
            <span className="hr-live-dot" aria-hidden="true" />
            {t('eyebrow')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease, delay: 0.08 }}
            className="mt-[clamp(0.5rem,1.5vh,1rem)] font-['Outfit'] text-[clamp(2rem,4.8vw,3.6rem)] leading-[0.95] font-bold tracking-[-0.03em] text-white"
          >
            {t('title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.18 }}
            className="mt-[clamp(0.6rem,1.6vh,1rem)] max-w-[56ch] font-['Outfit'] text-[clamp(0.98rem,1.3vw,1.3rem)] leading-[1.55] text-white/80"
          >
            {t('description')}
          </motion.p>
        </div>
      </div>

      {/* Vitrine de dispositivos — o conteúdo próprio desta página. */}
      <div id="conteudo-aplicativos" className="relative w-full pt-[clamp(28px,5vh,56px)] pb-12">
        <div className="relative z-10 mx-auto w-full max-w-[1800px] px-4 text-center md:px-6">
          <motion.div
            variants={devicesContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="relative mx-auto mt-10 h-[300px] w-full max-w-[1180px] sm:h-[340px] md:mt-12 md:h-[430px] lg:h-[700px]"
          >
            {/* TOTEM CENTRAL */}
            <motion.div
              variants={deviceAnimation}
              className="absolute top-0 left-1/2 z-20 w-[58%] max-w-[778px] -translate-x-1/2 md:w-[54%] lg:w-[100%]"
            >
              <div className="relative w-full">
                <Image
                  src="/aplicativos/hero/totem.png"
                  alt="Totem"
                  width={778}
                  height={761}
                  className="relative z-10 h-auto w-full object-contain"
                  priority
                />

                {/* Caso depois queira vídeo dentro do totem */}

                <DeviceVideo
                  videoRef={totemVideoRef}
                  className="top-[5.2%] left-[1.7%] h-[42%] w-[96.3%] [clip-path:polygon(6.5%_0%,93.7%_0%,100%_100%,0%_100%)]"
                  radiusClassName="rounded-[0px]"
                />
              </div>
            </motion.div>

            {/* COMPUTADOR ESQUERDA */}
            <motion.div
              variants={deviceAnimation}
              className="absolute bottom-[0px] left-[7%] z-30 w-[31%] max-w-[422px] md:bottom-[-20px] md:left-[8%] md:w-[29%] lg:bottom-[-30px] lg:left-[0%] lg:w-[100%]"
            >
              <div className="relative w-full">
                <Image
                  src="/aplicativos/hero/computador.png"
                  alt="Computador"
                  width={423}
                  height={351}
                  className="relative z-10 h-auto w-full object-contain"
                  priority
                />

                <DeviceVideo
                  videoRef={computerVideoRef}
                  className="top-[5.4%] left-[4.1%] h-[65.9%] w-[92%]"
                  radiusClassName="rounded-[0px]"
                />
              </div>
            </motion.div>

            {/* CELULAR CENTRO BAIXO */}
            <motion.div
              variants={deviceAnimation}
              className="absolute bottom-[16px] left-[58%] z-40 w-[13%] max-w-[175px] -translate-x-1/2 md:bottom-[22px] md:w-[12%] lg:bottom-[-30px] lg:w-[100%]"
            >
              <div className="relative w-full">
                <Image
                  src="/aplicativos/hero/celular.png"
                  alt="Celular"
                  width={260}
                  height={520}
                  className="relative z-10 h-auto w-full object-contain"
                />

                <DeviceVideo
                  videoRef={mobileVideoRef}
                  className="top-[6%] left-[2%] h-[88%] w-[95.5%]"
                  radiusClassName="rounded-[5px]"
                />
              </div>
            </motion.div>

            {/* LAPTOP DIREITA */}
            <motion.div
              variants={deviceAnimation}
              className="absolute right-[7%] bottom-[0px] z-30 w-[32%] max-w-[380px] md:right-[7%] md:bottom-[24px] md:w-[30%] lg:right-[0%] lg:bottom-[-30px] lg:w-[100%]"
            >
              <div className="relative w-full">
                <Image
                  src="/aplicativos/hero/laptop.png"
                  alt="Laptop"
                  width={620}
                  height={400}
                  className="relative z-10 h-auto w-full object-contain"
                />

                <DeviceVideo
                  videoRef={laptopVideoRef}
                  className="top-[7.2%] left-[11.3%] h-[80.6%] w-[77.7%]"
                  radiusClassName="rounded-[0px]"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
