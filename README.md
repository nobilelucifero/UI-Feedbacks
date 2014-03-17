# UI Feedbacks

A bunch of feedback ideas for your buttons. This demo does not rely on any particular coding technique, instead it just serves just as an inspiration to give your interfaces some more dynamism. I hope you'll enjoy it!

---

**Demo at: [creativespooks.com/ui-feedbacks](http://creativespooks.com/ui-feedbacks)**

---

**Note:** more is coming. Suggestions are welcomed!


##Browser support

I still didn't have the chance to test it on IE* nor IE* Mobile or older versions of Safari. I tested Chrome for Android and Safari Mobile (on the iOS Simulator). Both seems to work fine.

| Chrome | Firefox | IE   | Safari |
|:-------|:--------|:-----|:-------|
| 33     | 27      | 9-10 | 7      |


## Known issues

* Safari 7 (at least on Desktop) has a **terrible** upscalong of SVGs. Not sure if I can do anything for this issue.
* Firefox seems to have some problems in transitioning paths inside inline SVGs. I'm playing around the code to make it work better. Plus, I get some artifacts in the rendering. I fear I won't be able to fix them.
* `previousElementSibling` is not supported by Safari. That's why the last section doesn't work. More infos here: [ChildNode.previousElementSibling](https://developer.mozilla.org/en-US/docs/Web/API/Childnode.previousElementSibling). Going to fix it as soon as possible!
* ~~On touch devices (I could test just Chrome on Android), these feedbacks tend to remain in a "focused" state. I'm investigating on this, but shouldn't be a big problem.~~ **Update**: this should be fixed now.
