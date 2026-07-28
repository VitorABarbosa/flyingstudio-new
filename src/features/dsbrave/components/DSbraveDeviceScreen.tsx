'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { dsbraveDemoUrl } from '../data/dsbraveData';

const IFRAME_UNMOUNT_DELAY = 760;
const MONITOR_OFF_DELAY = 220;

export default function DSbraveDeviceScreen() {
  const t = useTranslations('DSbravePage.hero');
  const screenRef = useRef<HTMLDivElement>(null);
  const [monitorOn, setMonitorOn] = useState(false);
  const [iframeMounted, setIframeMounted] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);
  const [interactiveMode, setInteractiveMode] = useState(false);
  const monitorOnRef = useRef(false);
  const turnOffTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const unmountTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const screen = screenRef.current;
    if (!screen) {
      return;
    }

    const mountObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (unmountTimeoutRef.current) {
            clearTimeout(unmountTimeoutRef.current);
            unmountTimeoutRef.current = null;
          }

          setIframeMounted(true);
          return;
        }

        if (!unmountTimeoutRef.current) {
          unmountTimeoutRef.current = setTimeout(() => {
            setIframeMounted(false);
            setIframeReady(false);
            setInteractiveMode(false);
            unmountTimeoutRef.current = null;
          }, IFRAME_UNMOUNT_DELAY);
        }
      },
      {
        rootMargin: '10% 0px 10% 0px',
        threshold: 0,
      },
    );

    const powerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (turnOffTimeoutRef.current) {
            clearTimeout(turnOffTimeoutRef.current);
            turnOffTimeoutRef.current = null;
          }

          if (!monitorOnRef.current) {
            monitorOnRef.current = true;
            setMonitorOn(true);
          }
          return;
        }

        if (monitorOnRef.current && !turnOffTimeoutRef.current) {
          turnOffTimeoutRef.current = setTimeout(() => {
            monitorOnRef.current = false;
            setMonitorOn(false);
            setInteractiveMode(false);
            turnOffTimeoutRef.current = null;
          }, MONITOR_OFF_DELAY);
        }
      },
      {
        rootMargin: '-18% 0px -18% 0px',
        threshold: 0,
      },
    );

    mountObserver.observe(screen);
    powerObserver.observe(screen);

    return () => {
      if (turnOffTimeoutRef.current) {
        clearTimeout(turnOffTimeoutRef.current);
      }
      if (unmountTimeoutRef.current) {
        clearTimeout(unmountTimeoutRef.current);
      }
      mountObserver.disconnect();
      powerObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={screenRef}
      className="relative h-[420px] w-full overflow-hidden rounded-[28px] border border-[var(--theme-screen-border)] shadow-[0_18px_60px_var(--theme-border-soft)] md:h-[650px] md:rounded-[48px] lg:h-[820px]"
    >
      <div
        className={`h-full w-full transition-[filter,opacity] duration-700 ${
          monitorOn && iframeReady ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          filter: monitorOn ? 'brightness(1) contrast(1)' : 'brightness(0.3) contrast(0.8)',
          pointerEvents: interactiveMode ? 'auto' : 'none',
        }}
      >
        {iframeMounted ? (
          <iframe
            src={dsbraveDemoUrl}
            title={t('iframeTitle')}
            className="h-full w-full border-0"
            allow="fullscreen; gyroscope; accelerometer; autoplay"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => setIframeReady(true)}
          />
        ) : null}
      </div>

      {monitorOn && iframeReady && !interactiveMode ? (
        <button
          type="button"
          onClick={() => setInteractiveMode(true)}
          className="absolute inset-0 z-30 flex cursor-pointer items-center justify-center bg-transparent"
        >
          <span className="rounded-[99px] bg-[var(--theme-tooltip-bg)] px-[14px] py-[8px] text-[13px] font-medium tracking-[0.2px] text-white backdrop-blur-sm">
            {t('interactLabel')}
          </span>
        </button>
      ) : null}

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
          monitorOn ? 'monitor-power-on opacity-0' : 'monitor-power-off opacity-100'
        }`}
        style={{ background: 'var(--theme-screen-overlay)' }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 left-0 z-40 h-[8px] bg-[var(--theme-accent)] transition-colors duration-200 md:h-[13px]"
      />
    </div>
  );
}
