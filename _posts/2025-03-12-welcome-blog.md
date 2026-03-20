---
title: "Ласкаво просимо до блогу"
date: 2025-03-12
description: "Перша публікація в блозі — як додавати статті з зображеннями та відео."
image: /assets/images/hero-default.jpg
youtube:
  - "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
---

Це приклад статті в блозі. Тут ви можете писати основний текст у форматі Markdown.

## Як додавати контент

У статтях підтримуються **жирний текст**, *курсив*, списки та інші елементи Markdown.

Зображення в тексті додаються стандартним синтаксисом Markdown:

![Опис зображення](/assets/images/hero-default.jpg)

Відео з YouTube можна додати двома способами:

1. **У front matter** — додайте поле `youtube` з посиланням або списком посилань (як у цій статті).
2. **У тексті** — вставте тег включення: `{% raw %}{% include youtube.html url="https://www.youtube.com/watch?v=VIDEO_ID" %}{% endraw %}` або `{% raw %}{% include youtube.html id="VIDEO_ID" %}{% endraw %}`.

Слідкуйте за оновленнями — у блозі з’являтимуться корисні матеріали, поради та новини.
