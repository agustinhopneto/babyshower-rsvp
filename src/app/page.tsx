'use client';

import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { MutableRefObject, useCallback, useRef } from 'react';

import AnimatedGradientText from '@/components/magicui/animated-gradient-text';
import { BorderBeam } from '@/components/magicui/border-beam';
import DotPattern from '@/components/magicui/dot-pattern';
import Meteors from '@/components/magicui/meteors';
import SparklesText from '@/components/magicui/sparkles-text';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

import babySvg from '../assets/baby.svg';

export default function Home() {
  const infoSection = useRef<HTMLElement>(null);

  const scrollTo = useCallback((ref: MutableRefObject<HTMLElement | null>) => {
    if (!ref?.current) {
      return;
    }

    ref.current?.scrollIntoView();
  }, []);
  return (
    <main>
      <section className="relative flex h-dvh w-full flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-white to-pink-200 p-8">
        <div className="flex flex-col gap-8">
          <nav className="z-10 mx-auto rounded-lg bg-white/5 p-2 shadow-lg backdrop-blur-sm">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-2">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    onClick={() => scrollTo(infoSection)}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'cursor-pointer bg-transparent text-stone-600 hover:bg-background',
                    )}
                  >
                    Informações
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'cursor-pointer bg-transparent text-stone-600 hover:bg-background',
                    )}
                  >
                    Confirmação
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'cursor-pointer bg-transparent text-stone-600 hover:bg-background',
                    )}
                  >
                    Lista
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
          <div>
            <div className="relative flex w-full max-w-screen-md flex-col items-center gap-4 sm:gap-8">
              <SparklesText
                className="text-center text-3xl font-extrabold leading-tight tracking-tight text-stone-600 sm:text-4xl md:text-5xl lg:text-6xl"
                text="Oie! 👋"
              />

              <h1 className="text-center text-3xl font-bold leading-tight tracking-tight text-stone-600 sm:text-4xl md:text-5xl lg:text-6xl">
                Passando para avisar que{' '}
                <span className="text-pink-400">estou a caminho</span>!
              </h1>

              <p className="text-center text-base text-stone-500 lg:text-lg">
                Eu sou a <span className="text-pink-400">Carolina Lira</span>{' '}
                (Carolira pros íntimos) e gostaria de lhe fazer um convite para
                um evento muito especial...
                <br /> <strong>meu chá de bebê</strong>!
              </p>

              <Image
                src={babySvg}
                alt="Ilustração de um bebê em um útero rodeado por flores"
                className="w-full max-w-xs md:max-w-sm"
              />

              <div className="absolute right-1/2 top-6 h-72 w-72 rounded-full bg-red-500 opacity-30 blur-3xl"></div>
              <div className="absolute left-3/4 top-16 h-56 w-56 rounded-full bg-pink-500 opacity-30 blur-3xl"></div>
            </div>
          </div>
        </div>

        <AnimatedGradientText
          onClick={() => scrollTo(infoSection)}
          className="cursor-pointer"
        >
          🎉 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-stone-300" />{' '}
          <span
            className={cn(
              `to-orange-from-orange-500 inline animate-gradient bg-gradient-to-r from-orange-500 via-pink-400 bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
            )}
          >
            Com certeza eu quero ir!
          </span>
          <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedGradientText>
        <Meteors number={40} />
      </section>
      <section
        ref={infoSection}
        className="relative flex w-full flex-col items-center justify-between overflow-hidden bg-white p-8"
      >
        <div className="relative z-50 mx-auto w-full max-w-screen-md">
          <h2 className="text-left text-3xl font-bold leading-tight tracking-tight text-stone-600">
            Vai acontecer na <br />
            minha <span className="text-pink-400">primeira casinha</span>!
          </h2>
          <p className="mt-4 text-xl font-bold text-stone-600">
            No dia 14 de Setembro de 2024 às 10h!
          </p>
          <div className="mt-6">
            <p className="text-lg font-bold text-stone-600">
              Ela fica nesse endereço:
            </p>
            <p className="mt-2 text-xl leading-tight text-stone-600">
              📍 R. Prof. Luis Eulálio de Bueno Vidigal, 137 - Centro, Osasco -
              SP, 06093-085
            </p>
          </div>
          <p className="mt-8 text-base font-light leading-tight text-stone-600">
            Vou deixar no mapinha pra facilitar 😉
          </p>
          <div className="relative mt-3 h-full rounded-lg shadow-lg">
            <iframe
              className="h-80 w-full rounded-lg"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14632.890316887922!2d-46.78829658524168!3d-23.524495629770577!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ceff386a16cb4d%3A0x4db8ae004e82ea96!2sBoulevard%20Parque%20Central!5e0!3m2!1spt-BR!2sbr!4v1721879269057!5m2!1spt-BR!2sbr"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <BorderBeam />
          </div>
          <div className="pointer-events-none absolute left-3/4 top-6 z-10 h-72 w-72 rounded-full bg-red-500 opacity-20 blur-3xl"></div>
          <div className="pointer-events-none absolute right-1/2 top-16 z-10 h-56 w-56 bg-pink-500 opacity-30 blur-3xl"></div>
        </div>
        <AnimatedGradientText
          onClick={() => scrollTo(infoSection)}
          className="mt-8 cursor-pointer"
        >
          🎉 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-stone-300" />{' '}
          <span
            className={cn(
              `to-orange-from-orange-500 inline animate-gradient bg-gradient-to-r from-orange-500 via-pink-400 bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
            )}
          >
            Vamos confirmar sua presença?
          </span>
          <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedGradientText>
        <DotPattern className="z-0" />
      </section>
    </main>
  );
}
