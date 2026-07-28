'use client';

import { useEffect, useRef, type RefObject } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';

const ease = [0.22, 1, 0.36, 1] as const;

const tourVideoSrc = '/tour/tour.mp4';

const notebookAnimation = {
  hidden: { opacity: 0, y: 70, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.1,
      ease,
    },
  },
};

type TourVideoProps = {
  className?: string;
  videoRef: RefObject<HTMLVideoElement | null>;
};

function TourVideo({ className = '', videoRef }: TourVideoProps) {
  return (
    <div className={`pointer-events-none absolute overflow-hidden bg-black ${className}`}>
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        onVolumeChange={(event) => {
          event.currentTarget.muted = true;
          event.currentTarget.volume = 0;
        }}
      >
        <source src={tourVideoSrc} type="video/mp4" />
      </video>
    </div>
  );
}

export default function TourHero() {
  const t = useTranslations('Tour360Page.hero');
  const sectionRef = useRef<HTMLElement | null>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const notebookVideoRef = useRef<HTMLVideoElement | null>(null);

  /* Paralaxe: a foto sobe mais devagar que a página. O `scale` extra existe
     para o deslocamento nunca revelar a borda de baixo da imagem. */
  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ['start start', 'end start'],
  });
  const bannerY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);

  useEffect(() => {
    const section = sectionRef.current;
    const notebookVideo = notebookVideoRef.current;

    if (!section || !notebookVideo) return;

    const videos = [notebookVideo];

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
            src="https://img.flyingstudio.com.br/site-flying/LOTEAMENTOS/Granlote_Boituva_Piscina_C_HR.jpg"
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

      {/* Notebook com o tour rodando — o conteúdo próprio desta página. */}
      <div id="conteudo-tour-360" className="relative w-full pt-[clamp(28px,5vh,56px)] pb-12">
        <div className="relative z-10 mx-auto w-full max-w-[1800px] px-4 text-center md:px-6">
          <motion.div
            variants={notebookAnimation}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="relative mx-auto mt-10 w-full max-w-[1343px] md:mt-12"
          >
            <div className="relative w-full">
              <Image
                src="/tour/hero/notebook.png"
                alt={t('title')}
                width={1343}
                height={771}
                className="relative z-10 h-auto w-full object-contain"
                priority
              />

              <TourVideo
                videoRef={notebookVideoRef}
                className="top-[6.1%] left-[11.3%] z-20 h-[85%] w-[77.8%] rounded-[0px]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
