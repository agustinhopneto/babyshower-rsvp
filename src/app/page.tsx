'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight, LoaderCircle, Plus, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useHookFormMask } from 'use-mask-input';
import { z } from 'zod';

import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text';
import { BorderBeam } from '@/components/magicui/border-beam';
import { DotPattern } from '@/components/magicui/dot-pattern';
import { Meteors } from '@/components/magicui/meteors';
import { NeonGradientCard } from '@/components/magicui/neon-gradient-card';
import { SparklesText } from '@/components/magicui/sparkles-text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { data } from '@/config/data';
import { useConfetti } from '@/hooks/use-confetti';
import { ConfirmationTypeEnum } from '@/lib/constants';
import { dayjs } from '@/lib/dayjs';
import { cn } from '@/lib/utils';
import { API } from '@/services/api';

import babySvg from '../assets/baby.svg';
import catSvg from '../assets/cat.svg';
import unicornSvg from '../assets/unicorn.svg';

const confirmationType = String(
  process.env.NEXT_PUBLIC_RSVP_TYPE,
) as ConfirmationTypeEnum;

const config = data[confirmationType];
const { credits } = data;

function isValidPhone(value: string) {
  value = value.replace(/\D/g, '');

  return value.length === 11;
}

const confirmationSchema = z.object({
  type: z.nativeEnum(ConfirmationTypeEnum),
  phone: z
    .string({ required_error: 'Campo obrigatório.' })
    .refine((data) => isValidPhone(data), {
      message: 'Digite um telefone válido.',
    }),
  people: z.array(
    z.object({
      value: z
        .string({ required_error: 'Campo obrigatório.' })
        .min(1, 'Tá sem o nominho.')
        .max(255, 'É redação pro ENEM!?'),
    }),
  ),
});

export type ConfirmationData = z.infer<typeof confirmationSchema>;

export default function Home() {
  const infoSection = useRef<HTMLElement>(null);
  const formSection = useRef<HTMLElement>(null);
  const listSection = useRef<HTMLElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const { fireworks } = useConfetti();

  const { register, handleSubmit, control, formState, reset } =
    useForm<ConfirmationData>({
      defaultValues: {
        type: ConfirmationTypeEnum[confirmationType],
        phone: '',
        people: [
          {
            value: '',
          },
        ],
      },
      resolver: zodResolver(confirmationSchema),
    });

  const registerWithMask = useHookFormMask(register);

  const peopleField = useFieldArray({
    control,
    name: 'people',
  });

  const handleAddPerson = useCallback(() => {
    peopleField.append({ value: '' });
  }, [peopleField]);

  const removePerson = useCallback(
    (index: number) => {
      peopleField.remove(index);
    },
    [peopleField],
  );

  const scrollTo = useCallback((ref: MutableRefObject<HTMLElement | null>) => {
    if (!ref?.current) {
      return;
    }

    ref.current?.scrollIntoView();
  }, []);

  const handleConfirmationSubmit = useCallback(
    async (data: ConfirmationData) => {
      try {
        setIsLoading(true);
        const api = new API();

        await api.sendConfirmation(data);

        setIsSubmitted(true);
        fireworks();
      } catch (err) {
        setIsError(true);
        console.log(err);
      } finally {
        setIsLoading(false);
        reset();
      }
    },
    [fireworks, reset],
  );

  useEffect(() => {
    if (isSubmitted || isError) {
      scrollTo(formSection);
    }
  }, [scrollTo, formSection, isSubmitted, isError]);

  return (
    <main>
      <section className="relative flex min-h-dvh w-full flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-white to-pink-200 p-8">
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
                    Sobre
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    onClick={() => scrollTo(formSection)}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'cursor-pointer bg-transparent text-stone-600 hover:bg-background',
                    )}
                  >
                    Confirmar
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    onClick={() => scrollTo(listSection)}
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
                className="w-full max-w-md"
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
            Vai acontecer
            <br />
            <span className="text-pink-400">{config.location}</span>!
          </h2>
          <p className="mt-4 text-xl font-bold text-stone-600">
            No dia {config.date.format('LLL')}!
          </p>
          <div className="mt-6">
            <p className="text-lg font-bold text-stone-600">
              Ela fica nesse endereço:
            </p>
            <p className="mt-2 text-xl leading-tight text-stone-600">
              📍 {config.address}
            </p>
          </div>
          <p className="mt-8 text-base font-light leading-tight text-stone-600">
            Vou deixar no mapinha pra facilitar 😉
          </p>
          <div className="relative mt-3 h-full rounded-lg shadow-lg">
            <iframe
              className="h-80 w-full rounded-lg"
              src={config.mapsFrame}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <BorderBeam />
          </div>
          <div className="pointer-events-none absolute left-3/4 top-6 z-10 h-72 w-72 rounded-full bg-red-500 opacity-20 blur-3xl"></div>
          <div className="pointer-events-none absolute right-1/2 top-16 z-10 h-56 w-56 bg-pink-500 opacity-30 blur-3xl"></div>
        </div>
        <AnimatedGradientText
          onClick={() => scrollTo(formSection)}
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
        <DotPattern className="z-0 [mask-image:radial-gradient(1080px_circle_at_center,white,transparent)]" />
      </section>
      <section
        ref={formSection}
        className="relative flex w-full flex-col items-center overflow-hidden bg-gradient-to-b from-white to-pink-50 p-8"
      >
        <div className="relative z-10 flex w-full flex-col items-center">
          {!isSubmitted && !isError && (
            <>
              <h2 className="mb-3 text-center text-3xl font-bold leading-tight tracking-tight text-stone-600">
                Confirme a sua <span className="text-pink-400">presença</span>
              </h2>
              <form
                onSubmit={handleSubmit(handleConfirmationSubmit)}
                className="flex w-full flex-col gap-3 sm:max-w-md"
              >
                <div>
                  <Label className="mb-1 text-stone-600">
                    Seu número do Zap
                  </Label>
                  <Input
                    {...registerWithMask('phone', '(99) 99999-9999')}
                    placeholder="(99) 99999-9999"
                    className="w-full border-0 text-stone-600 placeholder:text-stone-400"
                    inputMode="numeric"
                  />
                  {formState.errors.phone?.message && (
                    <p className="text-sm text-red-500">
                      {formState.errors.phone?.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <p className="mb-1 text-sm font-medium text-stone-600">
                    Os belos nominhos de quem irá
                  </p>
                  <div className="flex flex-col gap-2">
                    {peopleField.fields.map((_, index) => (
                      <div className="flex flex-col" key={`person${index}`}>
                        <div className="flex items-start gap-2">
                          <Input
                            {...register(`people.${index}.value`)}
                            className="w-full border-0 text-stone-600 placeholder:text-stone-400"
                            placeholder={`Nome completo ${index + 1}`}
                          />
                          {index > 0 && (
                            <Button
                              type="button"
                              className="border border-red-500 bg-transparent hover:bg-red-300"
                              onClick={() => removePerson(index)}
                            >
                              <Trash className="h-3 w-3 text-red-500" />
                            </Button>
                          )}
                        </div>
                        {formState.errors.people?.[index]?.value?.message && (
                          <p className="text-sm text-red-500">
                            {formState.errors.people?.[index]?.value?.message}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={handleAddPerson}
                  type="button"
                  className="w-full border border-pink-400 bg-white text-primary hover:text-white"
                >
                  <Plus />
                </Button>

                <Button
                  disabled={!formState.isDirty}
                  type="submit"
                  className="mt-4 text-white"
                >
                  {isLoading ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    'Confirmar'
                  )}
                </Button>
              </form>
            </>
          )}
          {isSubmitted && !isError && (
            <>
              <h2 className="mb-3 text-center text-3xl font-bold leading-tight tracking-tight text-stone-600">
                <span className="text-pink-400">Ebaaaaa</span>! Você confirmou!
              </h2>
              <p className="text-center text-lg text-stone-600">
                Faltam só{' '}
                <span className="text-pink-400">
                  {config.date.diff(dayjs(), 'days')} dias
                </span>{' '}
                e eu tô muiiiiito ansiosa!
              </p>
              <Image
                src={catSvg}
                alt="Gato astronauta com uma bola de lã"
                className="w-full max-w-xs"
              />
              <p className="max-w-md text-center text-lg text-stone-600">
                Ahhhh, e se você quiser me presentear, eu vou deixar uma{' '}
                <span className="text-pink-400">listinha aqui embaixo</span> 👇
                pra facilitar!
              </p>
              <AnimatedGradientText
                onClick={() => scrollTo(listSection)}
                className="mt-8 cursor-pointer"
              >
                🎉 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-stone-300" />{' '}
                <span
                  className={cn(
                    `to-orange-from-orange-500 inline animate-gradient bg-gradient-to-r from-orange-500 via-pink-400 bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                  )}
                >
                  Ver lista de presentes
                </span>
                <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedGradientText>
            </>
          )}
          {isError && (
            <>
              <h2 className="mb-3 text-center text-3xl font-bold leading-tight tracking-tight text-stone-600">
                Alguma coisa deu errado... 🙁
              </h2>
              <p className="max-w-md text-center text-lg text-stone-600">
                Chama {credits.at(0)?.title} (
                <Link
                  className="cursor-pointer text-pink-500 underline"
                  target="_blank"
                  href={credits.at(0)?.socialLink as string}
                >
                  {credits.at(0)?.socialUser}
                </Link>
                ) ou {credits.at(1)?.title} (
                <Link
                  className="cursor-pointer text-pink-500 underline"
                  target="_blank"
                  href={credits.at(1)?.socialLink as string}
                >
                  {credits.at(1)?.socialUser}
                </Link>
                ) na DM pra resolver, por favor!
              </p>
              <Image
                src={unicornSvg}
                alt="Unicórnio triste com folhas flutuando"
                className="w-full max-w-xs"
              />
            </>
          )}
        </div>
      </section>
      {!isError && (
        <section
          ref={listSection}
          className="relative flex w-full flex-col items-center overflow-hidden bg-gradient-to-b from-white to-pink-50 p-8"
        >
          <h2 className="mb-3 text-center text-3xl font-bold leading-tight tracking-tight text-stone-600">
            Essa é a <span className="text-pink-400">listinha</span> que eu
            fiz...
          </h2>
          <p className="mt-4 max-w-md text-center text-lg text-stone-600">
            É só clicar nesse{' '}
            <span className="text-pink-400">
              {' '}
              quadrado pequenininho e discreto{' '}
            </span>{' '}
            aqui embaixo que ele vai te levar pra uma lista que eu tenho certeza
            que você vai achar <span className="text-pink-400">bem legal</span>!
          </p>
          <Link href={data.giftsListUrl}>
            <NeonGradientCard className="mt-6 max-w-xs items-center justify-center text-center">
              <span className="z-10 h-full cursor-pointer whitespace-pre-wrap bg-gradient-to-br from-pink-500 from-35% to-sky-500 bg-clip-text text-center text-2xl font-bold leading-none tracking-tighter text-transparent">
                Minha lista de presentes
              </span>
            </NeonGradientCard>
          </Link>
        </section>
      )}
      <footer className="flex items-center justify-center p-4">
        <p className="max-w-md text-center text-sm font-light text-stone-500">
          Isso aqui foi feito com muito carinho com a ajuda do{' '}
          {credits.at(0)?.title} (
          <Link
            className="cursor-pointer text-pink-400 underline"
            target="_blank"
            href={credits.at(0)?.socialLink as string}
          >
            {credits.at(0)?.socialUser}
          </Link>
          ) e {credits.at(1)?.title} (
          <Link
            className="cursor-pointer text-pink-400 underline"
            target="_blank"
            href={credits.at(1)?.socialLink as string}
          >
            {credits.at(1)?.socialUser}
          </Link>
          ) ❤️
        </p>
      </footer>
    </main>
  );
}
