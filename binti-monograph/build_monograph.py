#!/usr/bin/env python3
"""Build the Binti Rising one-page photographic monograph HTML.
Embeds the 14 Nairobi team photographs as base64 data URIs (Playwright
cannot load local paths) and writes monograph.html.
"""
import base64
import os

HERE = os.path.dirname(os.path.abspath(__file__))
IMG_DIR = os.path.join(os.path.dirname(HERE), "binti-photos", "jpg")
OUT = os.path.join(HERE, "monograph.html")


def b64(name: str) -> str:
    with open(os.path.join(IMG_DIR, name), "rb") as f:
        return "data:image/jpeg;base64," + base64.b64encode(f.read()).decode("ascii")


HTML_TEMPLATE = r"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Binti Rising — From Silence, She Rises · A Photographic Monograph</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">
<style>
  :root {
    --paper:  #f6f3ee;
    --ink:    #1a1626;
    --muted:  #6f6a7c;
    --indigo: #4f46e5;
    --pink:   #e23c82;
    --line:   rgba(26, 22, 38, 0.14);
  }
  * { box-sizing: border-box; }
  html, body {
    margin: 0;
    padding: 0;
    background: #f6f3ee;
  }
  body {
    font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
    color: #1a1626;
    line-break: strict;
    word-break: normal;
  }
  .poster {
    width: 900px;
    position: relative;
    background: #f6f3ee;
    padding: 0 64px 56px 64px;
  }
  p { overflow-wrap: break-word; text-align: left; }

  /* ---------- Masthead ---------- */
  .masthead { padding-top: 54px; }
  .kicker-row {
    display: flex; flex-wrap: wrap; justify-content: space-between; align-items: baseline;
    gap: 12px; padding-bottom: 14px; border-bottom: 1px solid var(--line);
  }
  .kicker {
    font-size: 11px; font-weight: 600; letter-spacing: 3.5px;
    text-transform: uppercase; color: #6f6a7c;
  }
  .kicker strong { color: #4f46e5; font-weight: 700; }
  h1.headline {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 900;
    font-size: 82px;
    line-height: 1.0;
    margin: 40px 0 0 0;
    color: #1a1626;
    letter-spacing: -1px;
  }
  h1.headline .rise {
    font-style: italic;
    font-weight: 700;
    color: #4f46e5;
  }
  .standfirst {
    max-width: 660px;
    font-size: 17px; line-height: 1.68; font-weight: 400;
    color: rgba(26, 22, 38, 0.82);
    margin: 26px 0 0 0;
  }
  .meta-strip {
    display: flex; flex-wrap: wrap; gap: 8px 0;
    margin-top: 24px; padding: 12px 0;
    border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
  }
  .meta-strip span {
    font-size: 10.5px; font-weight: 600; letter-spacing: 2.2px;
    text-transform: uppercase; color: #6f6a7c;
  }
  .meta-strip span::after {
    content: '·'; margin: 0 14px; color: rgba(26,22,38,0.3);
  }
  .meta-strip span:last-child::after { content: none; }

  /* ---------- Acts ---------- */
  .act { margin-top: 52px; }
  .act-label {
    display: flex; align-items: center; gap: 16px; margin-bottom: 14px;
  }
  .act-label .no {
    font-family: 'Playfair Display', Georgia, serif;
    font-style: italic; font-weight: 700; font-size: 20px; color: #4f46e5;
  }
  .act-label .name {
    font-size: 11px; font-weight: 700; letter-spacing: 3px;
    text-transform: uppercase; color: #4f46e5; white-space: nowrap;
  }
  .act-label .rule { flex: 1 1 auto; height: 1px; background: var(--line); }
  .act-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 700; font-size: 30px; line-height: 1.15;
    margin: 0 0 12px 0; color: #1a1626;
  }
  .act-text {
    max-width: 660px; font-size: 15.5px; line-height: 1.7;
    color: rgba(26, 22, 38, 0.8); margin: 0 0 24px 0;
  }

  /* ---------- Figures ---------- */
  figure { margin: 0; }
  figure img {
    display: block; width: 100%; height: 100%;
    object-fit: cover; border: 1px solid rgba(26, 22, 38, 0.10);
  }
  .frame { overflow: hidden; }
  figcaption {
    font-size: 11.5px; line-height: 1.55; color: #6f6a7c;
    padding-top: 9px; text-align: left;
  }
  figcaption b { font-weight: 700; color: #1a1626; letter-spacing: 0.5px; }
  .duo { display: flex; gap: 20px; }
  .duo .a { width: 58%; } .duo .b { width: 42%; }
  .duo .a .frame { aspect-ratio: 447 / 596; }
  .duo .b .frame { aspect-ratio: 305 / 596; }
  .full .frame { aspect-ratio: 772 / 434; }
  .pair { display: flex; gap: 20px; }
  .pair > figure { width: calc(50% - 10px); }
  .pair .frame { aspect-ratio: 3 / 4; }
  .row2 { display: flex; gap: 20px; align-items: flex-start; }
  .row2 .f1 { width: 40%; } .row2 .f2 { width: 60%; }
  .row2 .f1 .frame { aspect-ratio: 309 / 360; }
  .row2 .f2 .frame { aspect-ratio: 443 / 360; }
  .row2b { display: flex; gap: 20px; align-items: flex-start; }
  .row2b .f1 { width: 40%; } .row2b .f2 { width: 60%; }
  .row2b .f1 .frame { aspect-ratio: 293 / 400; }
  .row2b .f2 .frame { aspect-ratio: 459 / 400; }
  .band .frame { aspect-ratio: 772 / 483; }
  .band2 .frame { aspect-ratio: 772 / 347; }
  .certs .frame { aspect-ratio: 3 / 2; }

  /* ---------- Myth quote ---------- */
  .myth {
    margin: 4px 0 24px 0; padding-left: 22px;
    border-left: 2px solid var(--pink);
  }
  .myth .q {
    font-family: 'Playfair Display', Georgia, serif;
    font-style: italic; font-weight: 700; font-size: 27px; line-height: 1.3;
    color: #1a1626; text-decoration: line-through;
    text-decoration-color: #e23c82; text-decoration-thickness: 2.5px;
  }
  .myth .src {
    font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
    color: #6f6a7c; margin-top: 10px;
  }

  /* ---------- Coda / stats ---------- */
  .closing {
    max-width: 660px; font-size: 16px; line-height: 1.7;
    color: rgba(26, 22, 38, 0.85); margin: 26px 0 30px 0;
  }
  .closing em {
    font-family: 'Playfair Display', Georgia, serif;
    font-style: italic; color: #4f46e5;
  }
  .stat-strip {
    display: flex; flex-wrap: wrap; gap: 26px 44px;
    padding: 26px 0 24px 0; border-top: 1px solid var(--line);
    max-width: 100%;
  }
  .stat { flex: 0 1 auto; min-width: 110px; max-width: 100%; }
  .stat .n {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 900; font-size: 44px; line-height: 1; color: #1a1626;
  }
  .stat .l {
    font-size: 10.5px; font-weight: 600; letter-spacing: 2px;
    text-transform: uppercase; color: #6f6a7c; margin-top: 8px; line-height: 1.5;
  }

  /* ---------- Colophon ---------- */
  .colophon {
    margin-top: 34px; padding-top: 18px; border-top: 1px solid var(--line);
    display: flex; flex-wrap: wrap; gap: 8px 0; justify-content: space-between;
    font-size: 10.5px; line-height: 1.7; color: #6f6a7c;
  }
  .colophon .left { max-width: 470px; }
  .colophon .right { text-align: right; max-width: 300px; }
  .colophon b { color: #1a1626; font-weight: 600; }

  /* Browser preview auto-scale (print output unaffected) */
  @media screen {
    html {
      height: auto;
      display: flex;
      justify-content: center;
      background: #f6f3ee;
    }
    body {
      transform-origin: top center;
      scale: min(1, calc(100vw / 900));
      margin: 0 auto;
      box-shadow: 0 0 60px rgba(26, 22, 38, 0.18);
    }
  }
</style>
</head>
<body>
<div class="poster">

  <!-- ================= MASTHEAD ================= -->
  <header class="masthead">
    <div class="kicker-row">
      <div class="kicker"><strong>Binti Rising Initiative</strong>&nbsp;&nbsp;·&nbsp;&nbsp;A Photographic Monograph</div>
      <div class="kicker">Nairobi · MMXXVI</div>
    </div>
    <h1 class="headline">From Silence,<br><span class="rise">She&nbsp;Rises.</span></h1>
    <p class="standfirst">
      In Kibera, Mathare and Kawangware, the Binti Rising Initiative runs a peer-led
      mentorship programme — the Journey to Wholeness — for adolescent girls and young
      women aged 15 to 25. This monograph follows one arc through fourteen photographs
      from the Nairobi team's own camera roll: circle, classroom, voice, craft, proof, rise.
    </p>
    <div class="meta-strip">
      <span>Peer-led</span><span>Journey to Wholeness (JTW)</span><span>Ages 15–25</span>
      <span>Kibera — Mathare — Kawangware</span><span>DPA 2019 compliant</span>
    </div>
  </header>

  <!-- ================= ACT I ================= -->
  <section class="act">
    <div class="act-label"><span class="no">I.</span><span class="name">The Circle</span><span class="rule"></span></div>
    <h2 class="act-title">Nothing begins with a lesson.</h2>
    <p class="act-text">
      It begins with a circle — hands joined, names said aloud, the day's fears set in the
      middle where everyone can see them. Peer mentors lead; adults hold the space. Attendance
      across the three communities runs at ninety per cent and above, but the truer metric is
      simpler: they come back.
    </p>
    <div class="duo">
      <figure class="a">
        <div class="frame"><img src="%%IMG_01%%" alt="Hands joined in a close circle beneath a community tent"></div>
        <figcaption><b>Plate 01</b> · Under the community tent, hands meet in a closed circle — where every Journey to Wholeness begins.</figcaption>
      </figure>
      <figure class="b">
        <div class="frame"><img src="%%IMG_11%%" alt="A large dialogue circle of young people in a community hall"></div>
        <figcaption><b>Plate 11</b> · A dialogue circle in a community hall: no podium, no stage — only peers.</figcaption>
      </figure>
    </div>
  </section>

  <!-- ================= ACT II ================= -->
  <section class="act">
    <div class="act-label"><span class="no">II.</span><span class="name">The Classroom</span><span class="rule"></span></div>
    <h2 class="act-title">The work moves through classrooms and halls.</h2>
    <p class="act-text">
      One week it is letters and stories on a chalkboard; the next, a conversation about the
      body, consent and health that the syllabus never scheduled. Sessions are built for
      15-to-25-year-olds — old enough to be trusted with the truth.
    </p>
    <figure class="full">
      <div class="frame"><img src="%%IMG_02%%" alt="Learners clapping during a classroom session"></div>
      <figcaption><b>Plate 02</b> · A classroom session in motion — learners count the rhythm, alphabets on the wall, questions in the air.</figcaption>
    </figure>
  </section>

  <!-- ================= ACT III ================= -->
  <section class="act">
    <div class="act-label"><span class="no">III.</span><span class="name">The Voice</span><span class="rule"></span></div>
    <div class="myth">
      <div class="q">“Girls are to be married off.”</div>
      <div class="src">Read aloud — then struck through, together. Session flipchart, Plate 08.</div>
    </div>
    <p class="act-text">
      On a paper flipchart, myths die in public. Facilitators write down what the street says;
      the circle answers back, line by line — ten steps to help a friend, myths crossed out in
      marker. When a girl takes the charts and stands, the session changes owners. That is
      precisely the point of a peer-led model.
    </p>
    <div class="pair">
      <figure>
        <div class="frame"><img src="%%IMG_07%%" alt="A girl standing and presenting flipcharts to her seated peers"></div>
        <figcaption><b>Plate 07</b> · A girl takes the flipcharts and stands. In JTW circles, the facilitator's chair moves aside for her.</figcaption>
      </figure>
      <figure>
        <div class="frame"><img src="%%IMG_08%%" alt="A flipchart listing ten steps to help a sad friend and crossed-out gender myths"></div>
        <figcaption><b>Plate 08</b> · The flipchart records the work: ten steps to reach a friend who is struggling — and the myths, struck through one by one.</figcaption>
      </figure>
    </div>
  </section>

  <!-- ================= ACT IV ================= -->
  <section class="act">
    <div class="act-label"><span class="no">IV.</span><span class="name">The Craft &amp; The Team</span><span class="rule"></span></div>
    <h2 class="act-title">Between circles, hands stay busy.</h2>
    <p class="act-text">
      Crayon on paper. A film afternoon. Handball drills. Comics that teach in the street's own
      language. Sport, art and story are not decoration here — they are how hard lessons get
      practised, rehearsed and remembered.
    </p>
    <div class="row2b">
      <figure class="f1">
        <div class="frame"><img src="%%IMG_05%%" alt="A young person colouring a flame drawing with crayons"></div>
        <figcaption><b>Plate 05</b> · A flame takes colour. Healing often starts in the hands.</figcaption>
      </figure>
      <figure class="f2">
        <div class="frame"><img src="%%IMG_12%%" alt="Young people watching a film during a screening session in a community hall"></div>
        <figcaption><b>Plate 12</b> · A screening afternoon — the film slows the room down; the discussion after it lasts longer.</figcaption>
      </figure>
    </div>
    <div class="row2" style="margin-top: 20px;">
      <figure class="f1">
        <div class="frame"><img src="%%IMG_10%%" alt="Olympic Handball Team lined up in orange kits facing a congratulations board"></div>
        <figcaption><b>Plate 10</b> · The handball squad lines up before the board that reads <i>Congratulations</i> — on the wall behind them, a vision: “Dignified, safe, just and empowered communities.”</figcaption>
      </figure>
      <figure class="f2">
        <div class="frame"><img src="%%IMG_13%%" alt="Young Kings SA team holding up Shujaaz magazines"></div>
        <figcaption><b>Plate 13</b> · Young Kings SA with their Shujaaz magazines — stories that carry health messages in the language of the street.</figcaption>
      </figure>
    </div>
  </section>

  <!-- ================= ACT V ================= -->
  <section class="act">
    <div class="act-label"><span class="no">V.</span><span class="name">The Proof</span><span class="rule"></span></div>
    <h2 class="act-title">Then the corridor becomes a stage.</h2>
    <p class="act-text">
      Certificates — co-signed by partners like MTV Shuga, PATH and Shujaaz — move from table
      to hand to wall. In February 2026, one school lifted a whole cohort's certificates at
      once. The photos do not show charity; they show completion.
    </p>
    <div class="pair certs">
      <figure>
        <div class="frame"><img src="%%IMG_03%%" alt="Facilitators in Surround Sound Kenya shirts posing with a certificate"></div>
        <figcaption><b>Plate 03</b> · Certificates of Achievement — and the pride that travels with them.</figcaption>
      </figure>
      <figure>
        <div class="frame"><img src="%%IMG_04%%" alt="A certificate being handed over with a handshake"></div>
        <figcaption><b>Plate 04</b> · A handshake, a certificate, a next step.</figcaption>
      </figure>
    </div>
    <figure class="band" style="margin-top: 20px;">
      <div class="frame"><img src="%%IMG_06%%" alt="Participants in school uniforms holding certificates in a settlement corridor"></div>
      <figcaption><b>Plate 06</b> · Certificates held high in a settlement walkway — the corridor becomes a graduation hall.</figcaption>
    </figure>
    <figure class="band2" style="margin-top: 20px;">
      <div class="frame"><img src="%%IMG_09%%" alt="A school group in green uniforms raising certificates in the air, Nairobi February 2026"></div>
      <figcaption><b>Plate 09</b> · Nairobi, February 2026 — a whole school lifts its certificates at once.</figcaption>
    </figure>
  </section>

  <!-- ================= CODA ================= -->
  <section class="act">
    <div class="act-label"><span class="no">Coda</span><span class="name">She Rises</span><span class="rule"></span></div>
    <figure class="full">
      <div class="frame"><img src="%%IMG_14%%" alt="A large group in team bibs raising their fists in front of a school with the motto Knowledge is Power"></div>
      <figcaption><b>Plate 14</b> · Beneath the motto “Knowledge is Power”, the group closes its story the way it opened it — together, fists raised.</figcaption>
    </figure>
    <p class="closing">
      <em>From silence, she rises</em> — but not alone, and not once. Every term the circle
      opens again, in Kibera, in Mathare, in Kawangware. The fists come up. The motto above
      them says what the programme believes.
    </p>
    <div class="stat-strip">
      <div class="stat"><div class="n">1,248</div><div class="l">Youth enrolled<br>FY-2025/26 aggregate</div></div>
      <div class="stat"><div class="n">3</div><div class="l">Communities<br>Kibera · Mathare · Kawangware</div></div>
      <div class="stat"><div class="n">90–95<span style="font-size:26px;">%</span></div><div class="l">Attendance<br>across sessions</div></div>
      <div class="stat"><div class="n">61→77</div><div class="l">Wellbeing index<br>six-month average</div></div>
    </div>
  </section>

  <!-- ================= COLOPHON ================= -->
  <footer class="colophon">
    <div class="left">
      <b>Plates.</b> All fourteen photographs are the initiative's own archive
      (<i>public/nairobi-team/</i>, traceable via <i>manifest.json</i> to the Nairobi team's
      Google Drive folder). Published under the Nairobi photo rule — no stock imagery, no
      substitutes. Tagged <b>nairobi-photos-v1.0</b> ·
      github.com/collins-muchiri/binti-rising-website
    </div>
    <div class="right">
      <b>Binti Rising Initiative</b><br>
      Reg No NC/SD/CBO/2026/0123 · hello@bintirising.or.ke<br>
      GBV Hotline 1195 · WhatsApp +254 758 919 709<br>
      Shortcode 20308 (Sema na Me) · Kenya DPA 2019 — aggregates only, no personal identifiers
    </div>
  </footer>

</div>
</body>
</html>
"""

# Plate -> filename mapping (converted JPEGs)
plate_files = {
    "IMG_01": "nairobi-01.jpg",
    "IMG_02": "nairobi-02.jpg",
    "IMG_03": "nairobi-03.jpg",
    "IMG_04": "nairobi-04.jpg",
    "IMG_05": "nairobi-05.jpg",
    "IMG_06": "nairobi-06.jpg",
    "IMG_07": "nairobi-07.jpg",
    "IMG_08": "nairobi-08.jpg",
    "IMG_09": "nairobi-09.jpg",
    "IMG_10": "nairobi-10.jpg",
    "IMG_11": "nairobi-11.jpg",
    "IMG_12": "nairobi-12.jpg",
    "IMG_13": "nairobi-13.jpg",
    "IMG_14": "nairobi-14.jpg",
}

html = HTML_TEMPLATE
for token, fname in plate_files.items():
    html = html.replace(f"%%{token}%%", b64(fname))

with open(OUT, "w", encoding="utf-8") as f:
    f.write(html)

print(f"Wrote {OUT} ({os.path.getsize(OUT) // 1024} KB)")
