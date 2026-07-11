"use client";

import { useEffect } from "react";
import { translateText, type Language } from "@/lib/translations";

const storageKey = "official-assembly-language";
const translatableAttributes = ["aria-label", "placeholder", "value"] as const;

function getSavedLanguage(): Language {
  if (typeof window === "undefined") {
    return "en";
  }

  return window.localStorage.getItem(storageKey) === "es" ? "es" : "en";
}

function isSkippedElement(element: Element | null) {
  if (!element) {
    return true;
  }

  return Boolean(
    element.closest(
      [
        "script",
        "style",
        "noscript",
        "svg",
        "code",
        "textarea",
        "[data-no-translate]",
        "[data-language-toggle]",
        ".material-symbols-outlined",
      ].join(","),
    ),
  );
}

function translateWithWhitespace(value: string, language: Language) {
  const trimmed = value.trim();

  if (!trimmed) {
    return value;
  }

  const leading = value.match(/^\s*/)?.[0] ?? "";
  const trailing = value.match(/\s*$/)?.[0] ?? "";

  return `${leading}${translateText(trimmed, language)}${trailing}`;
}

export function SiteTranslator() {
  useEffect(() => {
    const originalText = new WeakMap<Text, string>();
    const originalAttributes = new WeakMap<Element, Map<string, string>>();
    let currentLanguage = getSavedLanguage();
    let isApplying = false;
    let observer: MutationObserver | undefined;

    const rememberAttribute = (element: Element, attribute: string) => {
      let attributes = originalAttributes.get(element);

      if (!attributes) {
        attributes = new Map();
        originalAttributes.set(element, attributes);
      }

      if (!attributes.has(attribute)) {
        attributes.set(attribute, element.getAttribute(attribute) ?? "");
      }

      return attributes.get(attribute) ?? "";
    };

    const updateLanguageControls = () => {
      document.querySelectorAll<HTMLElement>("[data-language-toggle]").forEach((button) => {
        const label = button.querySelector<HTMLElement>("[data-language-label]");
        const isSpanish = currentLanguage === "es";

        button.setAttribute("aria-pressed", String(isSpanish));
        button.setAttribute(
          "aria-label",
          isSpanish ? "Translate site to English" : "Translate site to Spanish",
        );

        if (label) {
          const nextLabel = isSpanish ? "English" : "Español";

          if (label.textContent !== nextLabel) {
            label.textContent = nextLabel;
          }
        }
      });
    };

    const applyTranslations = () => {
      if (isApplying) {
        return;
      }

      isApplying = true;
      observer?.disconnect();
      document.documentElement.lang = currentLanguage === "es" ? "es" : "en";

      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          const parent = node.parentElement;

          if (isSkippedElement(parent) || !node.nodeValue?.trim()) {
            return NodeFilter.FILTER_REJECT;
          }

          return NodeFilter.FILTER_ACCEPT;
        },
      });
      const textNodes: Text[] = [];

      while (walker.nextNode()) {
        textNodes.push(walker.currentNode as Text);
      }

      textNodes.forEach((node) => {
        const original = originalText.get(node) ?? node.nodeValue ?? "";
        const translated = translateWithWhitespace(original, currentLanguage);

        originalText.set(node, original);
        if (node.nodeValue !== translated) {
          node.nodeValue = translated;
        }
      });

      document
        .querySelectorAll<HTMLElement>(
          translatableAttributes.map((attribute) => `[${attribute}]`).join(","),
        )
        .forEach((element) => {
          if (isSkippedElement(element)) {
            return;
          }

          translatableAttributes.forEach((attribute) => {
            if (!element.hasAttribute(attribute)) {
              return;
            }

            const original = rememberAttribute(element, attribute);
            const translated = translateText(original, currentLanguage);

            if (element.getAttribute(attribute) !== translated) {
              element.setAttribute(attribute, translated);
            }
          });
        });

      updateLanguageControls();
      isApplying = false;
      observer?.observe(document.body, {
        childList: true,
        subtree: true,
      });
    };

    const setLanguage = (language: Language) => {
      currentLanguage = language;
      window.localStorage.setItem(storageKey, language);
      applyTranslations();
    };

    const attachLanguageControls = () => {
      document.querySelectorAll<HTMLElement>("[data-language-toggle]").forEach((button) => {
        button.onclick = () => {
          setLanguage(currentLanguage === "es" ? "en" : "es");
        };
      });
    };

    attachLanguageControls();
    applyTranslations();

    observer = new MutationObserver(() => {
      attachLanguageControls();
      applyTranslations();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      document.querySelectorAll<HTMLElement>("[data-language-toggle]").forEach((button) => {
        button.onclick = null;
      });
    };
  }, []);

  return null;
}
