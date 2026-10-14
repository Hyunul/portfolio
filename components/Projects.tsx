"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { projects, type Project } from "@/data/projects";
import Section from "./Section";
import { LinkButtons, StackBadge, StackList } from "./Stack";

const CARD_STACK_LIMIT = 6;

function Thumbnail({ project, sizes }: { project: Project; sizes: string }) {
  return project.image ? (
    <Image src={project.image} alt={`${project.title} 아키텍처`} width={1600} height={900} sizes={sizes} className="aspect-video h-auto w-full object-contain" />
  ) : (
    <div className="flex aspect-video items-center justify-center text-2xl font-bold text-slate-400">{project.title}</div>
  );
}

function Header({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap items-center gap-2.5">
        <h3 className={`${large ? "text-3xl" : "text-xl"} font-bold text-slate-900 dark:text-white`}>{project.title}</h3>
        <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-bold text-white">{project.type}</span>
      </div>
      <p className="text-sm font-medium text-slate-500">
        {project.period}
        {project.status && ` | ${project.status}`}
      </p>
    </div>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const rest = project.stack.length - CARD_STACK_LIMIT;
  return (
    <article className="flex flex-col overflow-hidden rounded-[20px] border border-slate-200 bg-white transition-shadow hover:shadow-lg dark:border-gray-800 dark:bg-gray-950">
      <button type="button" onClick={onOpen} className="group relative block bg-slate-50 dark:bg-gray-900" aria-label={`${project.title} 자세히 보기`}>
        <Thumbnail project={project} sizes="(min-width: 768px) 548px, 100vw" />
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-sm font-bold text-white opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
          자세히 보기
        </span>
      </button>
      <div className="flex flex-1 flex-col gap-5 p-6">
        <Header project={project} />
        <p className="text-[15px] leading-[1.7] text-slate-600 dark:text-slate-300 break-keep">{project.summary}</p>
        {!!project.problems?.length && (
          <div className="rounded-xl border border-slate-200 p-4 dark:border-gray-800">
            <p className="mb-2 text-xs font-bold tracking-wider text-blue-600 dark:text-blue-400">문제 해결</p>
            <ol className="space-y-1.5">
              {project.problems.map((p, i) => (
                <li key={p.title} className="flex gap-2 text-sm text-slate-700 dark:text-slate-300 break-keep">
                  <span className="font-bold text-slate-400">{i + 1}</span>
                  <span>{p.title}</span>
                </li>
              ))}
            </ol>
            <button type="button" onClick={onOpen} className="mt-3 text-sm font-bold text-blue-600 hover:underline dark:text-blue-400">
              해결 과정 보기 →
            </button>
          </div>
        )}
        {!!project.metrics?.length && (
          <div className="grid grid-cols-2 gap-3">
            {project.metrics.slice(0, 2).map(([v, l]) => (
              <div key={v} className="rounded-xl bg-slate-50 px-4 py-3 dark:bg-gray-900">
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{v}</p>
                <p className="mt-0.5 text-xs text-slate-500 break-keep">{l}</p>
              </div>
            ))}
          </div>
        )}
        {!!project.links?.length && <LinkButtons links={project.links} />}
        <div className="mt-auto border-t border-slate-200 pt-4 dark:border-gray-700">
          <p className="mb-3 text-xs font-bold tracking-wider text-slate-500">TECH STACK</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.slice(0, CARD_STACK_LIMIT).map((s) => (
              <StackBadge key={s} label={s} />
            ))}
            {rest > 0 && (
              <button type="button" onClick={onOpen} className="rounded-[10px] border border-dashed border-slate-300 px-3 text-sm font-medium text-slate-500 hover:text-slate-800">
                +{rest}
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<Project | null>(null);

  const open = (p: Project) => {
    setSelected(p);
    dialogRef.current?.showModal();
  };

  return (
    <Section id="projects" eyebrow="SIDE PROJECTS" title="개인 프로젝트">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} onOpen={() => open(p)} />
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setSelected(null)}
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
        className="m-auto w-[calc(100%-2rem)] max-w-3xl rounded-[20px] bg-white p-0 backdrop:bg-black/60 dark:bg-gray-950"
      >
        {selected && (
          <div>
            <div className="relative bg-slate-50 dark:bg-gray-900">
              {selected.image ? (
                <a href={selected.image} target="_blank" rel="noopener noreferrer" title="아키텍처 크게 보기">
                  <Thumbnail project={selected} sizes="768px" />
                </a>
              ) : (
                <Thumbnail project={selected} sizes="768px" />
              )}
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-slate-700 shadow hover:bg-white"
                aria-label="닫기"
              >
                ✕
              </button>
            </div>
            <div className="space-y-6 p-6 md:p-8">
              <Header project={selected} large />
              <p className="text-base leading-[1.7] text-slate-600 dark:text-slate-300 break-keep">
                {selected.summary}. {selected.description}
              </p>
              {!!selected.links?.length && <LinkButtons links={selected.links} />}
              {!!selected.metrics?.length && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {selected.metrics.map(([v, l]) => (
                    <div key={v} className="rounded-xl bg-slate-50 px-5 py-4 dark:bg-gray-900">
                      <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{v}</p>
                      <p className="mt-1 text-[13px] text-slate-500 break-keep">{l}</p>
                    </div>
                  ))}
                </div>
              )}
              {!!selected.problems?.length && (
                <div className="space-y-4">
                  <p className="text-sm font-bold text-slate-500">문제 해결 과정</p>
                  {selected.problems.map((p, i) => (
                    <section key={p.title} className="rounded-xl border border-slate-200 p-5 dark:border-gray-800">
                      <h4 className="mb-3 text-lg font-bold text-slate-900 dark:text-white break-keep">
                        <span className="mr-2 text-blue-600 dark:text-blue-400">{String(i + 1).padStart(2, "0")}</span>
                        {p.title}
                      </h4>
                      <dl className="space-y-2.5">
                        {(
                          [
                            ["문제", p.problem],
                            ["원인", p.cause],
                            ["해결", p.solution],
                            ["결과", p.result],
                          ] as const
                        )
                          .filter(([, v]) => v)
                          .map(([k, v]) => (
                            <div key={k} className="grid grid-cols-[3rem_1fr] gap-2">
                              <dt className={`text-sm font-bold ${k === "결과" ? "text-blue-600 dark:text-blue-400" : "text-slate-400"}`}>{k}</dt>
                              <dd className="text-[15px] leading-[1.7] text-slate-600 dark:text-slate-300 break-keep">{v}</dd>
                            </div>
                          ))}
                      </dl>
                    </section>
                  ))}
                </div>
              )}
              <div>
                <p className="mb-3 text-sm font-bold text-slate-500">구현 내용</p>
                <ul className="space-y-2">
                  {selected.contributions.map((c) => (
                    <li key={c} className="flex gap-3 text-[15px] leading-[1.7] text-slate-600 dark:text-slate-300 break-keep">
                      <span className="text-slate-400">–</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <StackList items={selected.stack} />
            </div>
          </div>
        )}
      </dialog>
    </Section>
  );
}
