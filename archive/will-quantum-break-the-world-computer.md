# Will Quantum Break the World Computer?

## 0:00 - Cold open

The internet has an expiration date.

Not because your password is `hunter2`.
Not because some teenager installed Kali Linux.
But because the math protecting banks, browsers, crypto wallets, state secrets, and basically every serious encrypted connection was built with one huge assumption:

[ON SCREEN:  
Some problems are easy to create  
and brutally hard to reverse.]

Multiply two giant primes together?
Easy.

Go backwards and recover the primes?
Good luck. See you after the heat death of the universe.

That asymmetry is why RSA works.
Similar one-way math is why elliptic curve cryptography protects wallets, secure messaging, TLS, and a horrifying amount of modern infrastructure.

And then Peter Shor casually ruined the vibe.

Because in 1994, Shor showed that a powerful enough quantum computer could break the exact kind of math we use to keep public-key cryptography safe.

[ON SCREEN:  
RSA / Diffie-Hellman / Elliptic Curves  
Status: theoretically breakable]

Now to be clear:
Bitcoin does not die next Tuesday.
Your bank account is not being brute-forced by a fridge with qubits.

But there is one phrase that makes the timeline argument way less comforting:

[ON SCREEN:  
Harvest now  
Decrypt later]

We'll come back to that, because it's the part that kills the whole:
"we'll deal with it when quantum computers arrive" argument.

And recently, this stopped feeling like a distant sci-fi problem.

Google researchers, Ethereum-linked researchers, and quantum hardware teams have been publishing results that make the attack estimates look less insane than they used to.

Not easy.
Not solved.
But less comfortably impossible.

So the question is not “is this sci-fi?”
The question is:
How serious is this, really?
And what are researchers and companies doing right now so this doesn’t become a global security speedrun?

## 0:40 — Why this conversation suddenly exploded

And recently this whole discussion got WAY more serious.

For years, most people treated “Q-Day” — the moment a quantum computer can practically break modern public-key cryptography — as a distant sci-fi problem.

But then two major papers dropped.

One from Google Quantum AI.  
Another from researchers at Oratomic, Caltech, Berkeley, Stanford, and collaborators connected to Ethereum research.

And suddenly the estimated resources needed to attack elliptic curve cryptography dropped dramatically.

That triggered a huge reaction across the security world.

Justin Drake from the Ethereum Foundation called the results “monumental” and said his confidence in Q-Day happening by roughly 2032 had increased significantly — estimating at least around a 10% chance by then.

But importantly:  
this is NOT just coming from Justin Drake.

The broader conversation is being driven by multiple signals converging at once:

- Google researchers warning the timeline may be much shorter than previously assumed
    
- industry migration targets like Google Chrome aiming for post-quantum readiness around 2029
    
- expert surveys from researchers like Michele Mosca and the Global Risk Institute placing meaningful probability on cryptographically relevant quantum systems arriving in the 2030s
    
- and recent breakthroughs drastically lowering estimated attack costs against systems like Bitcoin and Ethereum signatures
    

Now VERY important:  
nobody knows the exact timeline.

2032 is NOT a prediction.  
It’s not “quantum apocalypse confirmed.”

What changed is:  
serious researchers are no longer treating this as a ridiculously far-away problem with near-zero probability.

And once the probability stops looking negligible…

suddenly the migration timeline for the entire internet becomes very real.

## 3:05 - Okay so whats the threat?

Now let's simplify what RSA is actually doing to understand the threat better.

Imagine I take two giant prime numbers:

[ON SCREEN:  
p x q = n]

I multiply them together and publish only:

[ZOOM IN ON:  
n]

That part is easy.

What I do NOT tell you is:  
what p and q were.

And that's the entire trick behind RSA.

Because on a classical computer, going backwards is extremely hard.

You basically have to search for the hidden factors.

For small numbers that's easy.

[ON SCREEN:  
3 x 5 = 15]

Cool.  
You can instantly see:  
15 = 3 x 5.

But RSA uses numbers hundreds or thousands of bits long.

[ON SCREEN:  
239847239847239847239847...]

At that size, factoring becomes brutally expensive for classical computers.

That's why RSA works.

Now enter Peter Shor's algorithm.

Shor discovered that a powerful enough quantum computer could factor these huge numbers dramatically faster.

Meaning:

[ON SCREEN:  
n -> p and q]

The "hard to reverse" part suddenly stops being hard.

And if that happens?

RSA basically collapses.

You could:

- spoof certificates
- impersonate websites
- decrypt intercepted traffic
- break secure key exchanges
- attack systems using RSA, Diffie-Hellman, and many elliptic curve schemes

That's why people take this seriously.

Now, VERY important:

This is theoretical right now.

We do NOT currently have a quantum computer capable of doing this at real-world RSA scale.

And even experts disagree on timelines.

Maybe 10 years.  
Maybe 30.  
Maybe much longer.

The important point is not:  
"Quantum apocalypse tomorrow."

The important point is:

If the technology eventually arrives,  
a huge amount of today's cryptography would need to change. and again don't forget about harvest now decrypt later.

---

So... what do we actually do about this?

Well, interestingly:  
without realizing it,  
many of us are already starting to use post-quantum cryptography today.

Modern systems are beginning to use hybrid key exchanges.

Meaning:  
instead of trusting just one cryptographic system,  
they combine two.

The first is elliptic curve cryptography -  
the older system currently used across huge parts of the internet.

[ON SCREEN:  
Elliptic Curves -> Current internet cryptography]

It's fast,  
efficient,  
battle-tested,  
and used everywhere for secure key exchange.

The problem is:  
elliptic curves rely on discrete logarithm problems.

And unfortunately,  
those are exactly the kinds of problems a powerful quantum computer could theoretically solve using Shor's algorithm.

So elliptic curves are NOT considered quantum safe.

That's where newer algorithms come in.

One of the big ones is Kyber.

[ON SCREEN:  
Kyber -> Post-Quantum Key Exchange]

Kyber uses completely different math -  
called lattice-based cryptography -  
which currently has no known efficient quantum attack.

And instead of replacing elliptic curves overnight,  
many systems now combine both.

[ON SCREEN:  
Elliptic Curve + Kyber = Hybrid Exchange]

So even if one system eventually fails,  
the other layer still protects the connection.

That's the current strategy:  
gradual migration,  
layered security,  
and preparing before quantum hardware becomes a real-world threat.

---

There's also another post-quantum approach called hash-based cryptography.

Instead of relying on factoring numbers or elliptic curve math,  
these systems build security almost entirely around cryptographic hash functions.

One major example is SPHINCS+,  
a post-quantum signature scheme selected by NIST.

The big advantage is:  
hash functions are currently believed to remain relatively robust even against quantum attacks.

---

Now here's where things get interesting.

Because for years, the common response was:

"Yeah yeah, Shor's algorithm exists... but the hardware is nowhere close."

And then recently, two new papers dropped that made a LOT of researchers suddenly pay attention again.

This whole discussion exploded after Justin Drake from the Ethereum Foundation posted a massive thread basically saying:

"Okay... these results are way more serious than expected."

And the thread spread so hard that even Elon Musk jumped in asking Grok if the claims were actually legit.

Which is a pretty good sign the conversation escaped the "tiny academic niche" phase and entered mainstream tech panic territory.

One paper came from researchers at Google Quantum AI.

The other came from a startup called Oratomic.

And according to researchers involved - including people connected to the Ethereum Foundation - these papers dramatically reduced the estimated resources needed to break modern elliptic curve cryptography.

Which is... not the headline you want to read before bed.

---

So let's translate what actually happened into human language.

Remember earlier when we talked about Shor's algorithm?

The big problem was never just:  
"Can Shor theoretically break RSA and elliptic curves?"

We already knew that.

The real question was:  
"How absurdly massive would the quantum computer need to be?"

Because previous estimates were so gigantic that many people basically treated this as science fiction infrastructure.

But these new papers aggressively optimized the attack.

Not by changing physics.

By making the attack itself WAY more efficient.

---

The Google paper focused on the logical layer.

Meaning:  
"How do we redesign Shor's algorithm specifically to attack real-world crypto systems like Bitcoin and Ethereum signatures as efficiently as possible?"

Specifically:  
the secp256k1 elliptic curve used by:

- Bitcoin
- Ethereum wallets
- tons of blockchain infrastructure

Their result suggested that a sufficiently advanced quantum machine might only need around:

[ON SCREEN:  
~1,000 logical qubits]

Now pause here, because this number is the part people constantly misunderstand.

When researchers talk about quantum computers, the headline number is usually "qubits."

But not all qubits mean the same thing.

A physical qubit is the actual fragile hardware qubit in the machine.

It is noisy.  
It loses information.  
It makes errors.

A logical qubit is what you get when many physical qubits are combined using error correction so the quantum computer can behave like it has one much more reliable qubit.

So when someone says:

[ON SCREEN:  
1 logical qubit  
= many physical qubits]

that does NOT mean one little hardware component.

It means an error-corrected unit of computation.

And this is the measurement that matters when we ask:

"Are we anywhere close to a machine that could actually run Shor's algorithm against real cryptography?"

Today, we are not sitting on a thousand cryptographically useful logical qubits.

Depending on the architecture and the benchmark, researchers have demonstrated logical qubits at the level of a few to a few dozen.

That's real progress.

But it is still very different from having around a thousand high-quality logical qubits running a huge attack circuit reliably.

Before these newer resource estimates, people often thought breaking real-world public-key cryptography would require a machine that was wildly larger:

[ON SCREEN:  
old estimates:  
thousands of logical qubits  
millions of physical qubits]

For RSA-2048 specifically, famous earlier estimates talked about millions of noisy physical qubits for a practical attack.

And for elliptic-curve systems like the ones used by Bitcoin and Ethereum, the numbers were also much less comforting for an attacker.

So the shock here is not:

"Quantum computers can break RSA."

We already knew Shor's algorithm said that in theory.

The shock is:

"Wait... this particular paper is saying the logical-qubit requirement for attacking secp256k1 might be around one thousand?"

That is a very different conversation.

And they also reduced something called circuit depth.

Think of circuit depth like:  
"How many sequential quantum operations must happen before the whole computation finishes?"

Lower depth matters enormously because quantum systems are extremely fragile.

The longer computation runs,  
the more noise and errors accumulate.

So reducing depth can massively improve practicality.

---

The paper estimated roughly:

[ON SCREEN:  
~100 million Toffoli gates]

Now that sounds enormous.

But in quantum computing terms?

That was surprisingly LOW.

Especially because modern superconducting quantum systems operate incredibly fast.

And again, quick pause:

What the heck is a Toffoli gate?

Because I know the obvious reaction is:

"Wait, I thought qubits were the number I was supposed to care about."

And yes - qubits matter.

Qubits tell you the size of the quantum computer.

How much quantum information it can hold at once.

But gates tell you the amount of work the computer has to perform.

Think of it like this:

[ON SCREEN:  
qubits = memory / workspace  
gates = operations / work]

A Toffoli gate is a specific reversible logic operation.

In normal computer terms, it behaves kind of like a controlled-controlled-NOT:

[ON SCREEN:  
if A and B are 1, flip C]

Why does that matter?

Because Shor's algorithm needs a huge amount of reversible arithmetic.

Multiplication.  
Modular exponentiation.  
All the math needed to turn the hidden structure of a private key or factorization problem into something measurable.

And Toffoli gates are one of the standard ways researchers count the cost of that reversible arithmetic.

So the full question is not just:

"How many logical qubits do we need?"

It is also:

"How many reliable operations do those logical qubits need to survive?"

That is why the paper talks about both:

[ON SCREEN:  
logical qubits = machine size  
Toffoli gates = attack workload]

And when that workload drops to around 100 million Toffoli gates,  
the attack starts sounding much less ridiculous than older estimates.

The paper estimated that if hardware eventually reaches the required scale,  
a private key recovery attack might take:

[ON SCREEN:  
Minutes, not years]

That's the part that caused the panic.

Not:  
"Quantum computers exist tomorrow."

But:  
"Theoretical attack cost just dropped a LOT."

---

Then the second paper pushed things even further.

This one focused on the physical layer.

Meaning:  
"How do we build the actual machine more efficiently?"

Instead of superconducting qubits,  
they explored neutral atom quantum computers.

Different architecture.  
Different tradeoffs.

Much slower execution speed -  
but potentially FAR more efficient qubit scaling.

Their estimate suggested that around:

[ON SCREEN:  
~26,000 physical qubits]

might theoretically be enough to break 256-bit elliptic curve cryptography.

That's important because older estimates were often hundreds of thousands or even millions of physical qubits.

So suddenly researchers started going:

"Okay... this timeline might not be as insanely far away as we thought."

---

Now VERY important:

None of this means:  
"Bitcoin dies next Tuesday."

These are still theoretical analyses.

We do NOT currently have fault-tolerant quantum computers capable of performing these attacks in the real world.

And there are still massive engineering challenges:

- error correction
- qubit stability
- scaling
- cooling
- coherence times
- manufacturing
- networking quantum systems

This is still an unbelievably hard problem.

But the reason these papers matter is psychological AND strategic.

They changed the direction of the curve.

---

One of the most important takeaways from the researchers was this:

The bottleneck may no longer be the mathematics.

It may become an engineering race.

And that's a huge shift.

Because if attack costs keep dropping,  
the migration timeline for post-quantum cryptography suddenly matters a lot more.

Especially when you remember:

[ON SCREEN:  
Harvest Now -> Decrypt Later]

If encrypted data collected today still matters in 10 years,  
then waiting until quantum computers fully arrive is already too late.

---

There was also another fascinating point raised around censorship.

One of the papers reportedly used zero-knowledge proof techniques to prove optimizations existed without fully revealing every implementation detail publicly.

Which led to a weird new concern:

What if the most advanced quantum attack research eventually becomes partially classified?

Or selectively undisclosed?

Because once these attacks become strategically important,  
governments and corporations may stop openly publishing the best techniques.

And honestly?

That sounds very believable.

---

The good news is:  
the industry is not asleep.

Major companies, standards bodies, browser vendors, cloud providers, and cryptographers are already migrating toward post-quantum systems.

That's why:

- NIST standardized post-quantum algorithms
- browsers are testing hybrid cryptography
- cloud providers are deploying PQC experiments
- messaging systems are beginning migrations

The race has already started.

And these papers were basically a giant alarm bell telling everyone:

"We should probably move faster."
