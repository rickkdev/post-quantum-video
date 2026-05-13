# Will Quantum Break the World Computer? - Fast-Cut Transcript

## 0:00 - Cold Open

The internet has an expiration date.

Not because your password is `hunter2`.
Not because some teenager installed Kali Linux.
But because most of modern security is built on one very convenient assumption:

[ON SCREEN:  
easy one way  
nightmare in reverse]

Multiplying two giant primes together is easy.

Going backwards and finding the primes?

Good luck. Your CPU is now a space heater.

That asymmetry is why RSA works.

And similar math protects TLS, wallets, secure messaging, bank logins, government systems, and basically every serious encrypted connection on Earth.

Then in 1994, Peter Shor showed up and ruined the vibe.

He proved that a powerful enough quantum computer could break the exact kind of math used by RSA, Diffie-Hellman, and elliptic curve cryptography.

[ON SCREEN:  
RSA / DH / ECC  
theoretically breakable]

To be clear:

Bitcoin does not die next Tuesday.
Your bank is not being brute-forced by a refrigerator with qubits.

But there is one phrase that makes this problem way less funny:

[ON SCREEN:  
HARVEST NOW  
DECRYPT LATER]

If somebody records encrypted traffic today, they might decrypt it years later when the hardware finally exists.

So the question is not:

"Will quantum computers delete the internet tomorrow?"

The question is:

"How much time do we actually have?"

And recently, that question got uncomfortable.

## 0:45 - Why Everyone Suddenly Cares

For years, the default answer to quantum panic was:

"Yeah, Shor's algorithm exists, but the hardware is nowhere close."

Which was true.

Then a few new papers dropped.

One from Google Quantum AI.
Another from researchers connected to Oratomic, Caltech, Berkeley, Stanford, and Ethereum research.

And suddenly the estimated cost of attacking real cryptography looked a lot less impossible.

Not easy.
Not solved.
But less comfortably fake.

Justin Drake from the Ethereum Foundation called the results monumental and said his confidence in Q-Day by around 2032 went way up, estimating at least around a 10% chance.

Now, 2032 is not a prophecy.

It is not "quantum apocalypse confirmed."

But in security, a 10% chance of global cryptographic pain is not a rounding error.

Especially when migrating the internet takes years.

Google Chrome has already been targeting post-quantum readiness around 2029.
NIST has standardized post-quantum algorithms.
Cloud providers and browsers are testing hybrid cryptography right now.

The industry is not doing this because it enjoys paperwork.

It is doing this because waiting until the threat is obvious is how you speedrun a disaster.

## 1:35 - The Basic Threat

Let's make the threat painfully simple.

RSA works because multiplication is easy and factoring is hard.

If I give you:

[ON SCREEN:  
7 x 13 = 91]

you can check it instantly.

But if I only give you:

[ON SCREEN:  
91 = ? x ?]

now you have to reverse it.

Still easy for 91.

But RSA does this with numbers hundreds or thousands of bits long.

[ON SCREEN:  
239847239847239847...]

At that size, classical computers basically have to grind through an absurd search space.

That is the lock.

Shor's algorithm is the cheat code.

It uses quantum mechanics to find hidden mathematical structure in the problem, which lets a powerful enough quantum computer factor large numbers dramatically faster.

[ON SCREEN:  
n -> p and q]

If that becomes practical, RSA breaks.

And not just RSA.

Diffie-Hellman and many elliptic curve systems are vulnerable too.

That means an attacker could potentially:

- impersonate websites
- break key exchanges
- spoof certificates
- recover private keys
- decrypt data that was recorded years earlier

Again:

We do not currently have a quantum computer that can do this at real-world scale.

But cryptography has a planning problem.

If the data needs to stay secret for 10, 20, or 30 years, then "not broken today" is not good enough.

## 2:35 - The Defense

So what do we do?

We migrate before the boss fight.

That is post-quantum cryptography.

Instead of using math based on factoring or elliptic curves, post-quantum systems use problems that we do not currently know how to break efficiently, even with quantum computers.

One major example is Kyber, now standardized by NIST as ML-KEM.

[ON SCREEN:  
Kyber / ML-KEM  
post-quantum key exchange]

It uses lattice-based cryptography.

Which sounds like something you unlock after drinking too much coffee in grad school, but the idea is simple:

finding the secret is like finding a very specific point in a massive high-dimensional grid.

Classical computers hate it.
Quantum computers do not get an obvious Shor-style shortcut.

So instead of replacing the whole internet overnight, many systems use a hybrid exchange:

[ON SCREEN:  
Elliptic Curve + Kyber  
= hybrid key exchange]

The old system is there because it is fast and battle-tested.

The new system is there because the old one has a quantum-shaped hole in it.

If one layer fails, the other still protects the connection.

This is boring engineering.

Which is exactly what you want when the alternative is "global key exchange incident."

There are also hash-based signatures like SPHINCS+.

These are built mostly on cryptographic hash functions, which are still believed to be relatively strong against quantum attacks.

The tradeoff is that signatures can get larger and slower.

Because security is always just choosing where you want the pain.

## 3:45 - What Changed

Now here is why the recent papers mattered.

We already knew Shor's algorithm could theoretically break RSA and elliptic curves.

That was not the new part.

The real question was:

[ON SCREEN:  
how big does the machine need to be?]

For years, the answer sounded like science fiction infrastructure.

Millions of physical qubits.
Huge error correction overhead.
Attack circuits so large they felt more like thought experiments than engineering plans.

Then researchers started optimizing.

Not by changing physics.

By making the attack cheaper.

The Google paper focused on the logical layer.

Meaning:

"How many error-corrected qubits and quantum operations would an optimized attack need?"

The target was secp256k1:

[ON SCREEN:  
secp256k1  
Bitcoin / Ethereum / wallets]

That is the elliptic curve used by Bitcoin, Ethereum wallets, and a lot of blockchain infrastructure.

Their estimate suggested that a sufficiently advanced quantum machine might need around:

[ON SCREEN:  
~1,000 logical qubits]

Now pause.

This is where everyone gets confused.

A physical qubit is the actual hardware qubit.

Tiny. Fragile. Annoying.

It loses information.
It makes errors.
It has the emotional stability of a production database on deploy day.

A logical qubit is made by combining many physical qubits with error correction so the computer gets one more reliable qubit.

[ON SCREEN:  
many physical qubits  
-> 1 logical qubit]

So when a paper says "1,000 logical qubits," that does not mean a laptop with 1,000 magic atoms.

It means 1,000 reliable quantum workspaces, each backed by a lot of noisy hardware.

Today, we are not sitting on 1,000 cryptographically useful logical qubits.

The latest public milestones are closer to the 100-logical-qubit range, and even that comes with important asterisks.

For example, Quantinuum's Helios system reported:

[ON SCREEN:  
Quantinuum Helios  
94 error-detected logical qubits  
48 error-corrected logical qubits]

That is a serious milestone.

It is also not the same thing as 1,000 high-quality logical qubits running a giant cryptographic attack circuit.

So keep the comparison in logical qubits:

[ON SCREEN:  
today: ~100 logical qubits  
paper estimate: ~1,000 logical qubits]

Before these newer estimates, people often expected attacks against real public-key cryptography to need many thousands of logical qubits.

Depending on the error-correction scheme, those logical qubits could translate into millions of noisy physical qubits.

But logical qubits are the cleaner comparison.

They are the "usable quantum computer" number.

So the shock was not:

"Quantum computers can break crypto."

We knew that.

The shock was:

"Wait, the optimized secp256k1 attack might only need around 1,000 logical qubits?"

That changes the room temperature.

## 5:10 - Gates, Depth, and Why This Got Scary

The same paper also reduced circuit depth.

Circuit depth is basically:

[ON SCREEN:  
how many steps  
must happen in sequence?]

Quantum computers are fragile.

The longer the computation runs, the more errors pile up.

And if your computation needs to survive longer, each logical qubit has to be protected harder.

Usually that means spending more physical qubits per logical qubit on error correction.

So lower depth matters a lot.

Then the paper estimated around:

[ON SCREEN:  
~100 million Toffoli gates]

Which sounds insane.

But in quantum attack math, that was surprisingly low.

Now, what is a Toffoli gate?

Because if you just learned that qubits matter, this sounds like the script introduced a second health bar.

Qubits measure how big the machine is.

Gates measure how much work it has to do.

[ON SCREEN:  
qubits = workspace  
gates = operations]

A Toffoli gate is basically a reversible building block for quantum arithmetic.

Normal computers can throw information away.

Quantum computers usually cannot.

So when Shor's algorithm does arithmetic, it has to do it in this more careful reversible style.

And Shor's algorithm needs a huge amount of that arithmetic:

Multiplication.
Modular exponentiation.
All the cursed math that turns a public key into a private disaster.

Toffoli gates are one standard way researchers count that workload.

Because the machine does not just need enough logical qubits.

It needs those qubits to survive millions of reliable math steps without the computation falling apart.

Or, complete dummy version:

[ON SCREEN:  
Toffoli gates  
= quantum math steps]

So the real question is two-part:

[ON SCREEN:  
1. how many logical qubits?  
2. how many reliable operations?]

And when both numbers drop, the attack stops feeling like pure sci-fi.

The paper estimated that if future hardware reaches the required scale, private key recovery could take:

[ON SCREEN:  
minutes  
not years]

That is the part that caused the panic.

Not because the machine exists today.

But because the theoretical attack cost moved hard in the wrong direction.

## 6:25 - The Physical Qubit Paper

Then the second paper attacked the problem from the hardware side.

Not:

"How do we optimize the algorithm?"

But:

"How do we build the machine more efficiently?"

Instead of superconducting qubits, it looked at neutral atom quantum computers.

Different architecture.
Different tradeoffs.

Slower operations, but potentially much better scaling.

Their estimate suggested that around:

[ON SCREEN:  
~26,000 physical qubits]

might theoretically be enough to break 256-bit elliptic curve cryptography under their assumptions.

Older estimates often lived in the hundreds of thousands or millions of physical qubits.

So researchers looked at this and basically said:

"Okay, maybe the timeline is not as ridiculous as we hoped."

And that is the real story.

Not that the quantum apocalypse is here.

But that the slope changed.

The problem started looking less like impossible math and more like an engineering race.

## 7:20 - Ethereum as the Example

And Ethereum is a good example of how a serious ecosystem is reacting to this.

Not by tweeting "quantum bad" and then going back to yield farming.

Ethereum has an actual post-quantum roadmap.

[ON SCREEN:  
pq.ethereum.org  
Post-Quantum Ethereum]

And I am using Ethereum here because it is not just taking the threat seriously.

It is arguably helping lead the industry research into what a real migration could look like.

The important thing is that Ethereum has different cryptography at different layers.

User wallets mostly use ECDSA over secp256k1.

Validators use BLS signatures.

Both are public-key signature systems.

Both are the kind of thing a future cryptographically relevant quantum computer could attack.

So Ethereum's problem is not:

"Pick one post-quantum algorithm and ship it."

The problem is:

"How do you migrate a global decentralized protocol without breaking wallets, validators, bridges, apps, and every weird smart contract somebody deployed in 2017?"

At the consensus layer, Ethereum's roadmap focuses on replacing BLS with hash-based signatures, specifically leanXMSS.

[ON SCREEN:  
BLS signatures  
-> leanXMSS]

This is interesting because leanXMSS is hash-based.

Not lattice-based like Kyber.

Why?

Because hashes are one of the oldest, simplest, and most conservative cryptographic building blocks we have.

Quantum computers do weaken hash security somewhat with Grover's algorithm.

But they do not get the same "delete the problem" shortcut that Shor's algorithm gets against elliptic curves and factoring.

So hash-based signatures are attractive when you want something boring, auditable, and built on assumptions cryptographers understand extremely well.

The downside is that post-quantum signatures are usually bigger.

And BLS has a superpower:

[ON SCREEN:  
BLS = easy signature aggregation]

Thousands of validator signatures can be compressed into one small proof.

Hash-based signatures do not naturally do that.

So Ethereum's plan is not just "swap BLS for hashes and call it a day."

They are researching SNARK-based aggregation using a minimal zkVM called leanVM.

[ON SCREEN:  
hash signatures  
+ SNARK aggregation  
= scalable PQ consensus]

Basically:

Use hash-based signatures for quantum resistance.

Then use proofs to compress the heavy stuff so the network does not choke on it.

On the execution layer, the roadmap is more about cryptographic agility.

That means account abstraction, post-quantum signature precompiles, and gradual opt-in migration instead of one terrifying flag day.

[ON SCREEN:  
Execution layer: PQ sig precompiles  
Consensus layer: PQ validator signatures  
Data layer: PQ blobs]

Their public roadmap roughly goes:

- PQ key registry
- PQ signature precompiles
- PQ attestations and real-time consensus proofs
- PQ signature aggregation and PQ blobs
- eventually, full post-quantum consensus and transactions

The timeline is also refreshingly non-delusional.

The Ethereum post-quantum team says the threat is probably not imminent.

But upgrading decentralized global infrastructure takes years.

Their current assessment is that L1 protocol upgrades could be completed by around 2029, with execution-layer migration taking additional years after that.

And that is the point.

This is what "taking quantum seriously" looks like.

Not panic.

Not denial.

Roadmaps, precompiles, account migration, formal verification, aggregation research, and years of boring coordination before the fire starts.

## 8:45 - The Giant Disclaimer

Now for the legally and intellectually necessary cold shower:

[ON SCREEN:  
NO, BITCOIN DOES NOT DIE TOMORROW]

These are theoretical resource estimates.

We do not currently have fault-tolerant quantum computers that can run these attacks in the real world.

The remaining problems are brutal:

- error correction
- qubit stability
- scaling
- cooling
- manufacturing
- coherence time
- connecting quantum systems

Quantum computers are not just "GPUs but spooky."

They are machines where the universe itself constantly tries to corrupt your state.

But if attack costs keep dropping, post-quantum migration becomes urgent.

Because migration is slow.

Browsers, servers, wallets, hardware devices, government systems, old enterprise software, random embedded boxes that nobody has touched since 2014.

All of it has to move.

And if encrypted data is harvested today, it can be attacked later.

[ON SCREEN:  
steal now  
decrypt later]

That is why waiting for a working quantum attack is a terrible plan.

## 9:45 - The Weird Censorship Problem

There is also a darker side to all this.

One of the papers reportedly used zero-knowledge proof techniques to show that certain optimizations existed without revealing every detail publicly.

That raises a weird question:

What happens when quantum attack research becomes strategically valuable?

Do governments keep publishing the best techniques?

Do companies?

Or does the cutting edge disappear behind classification, NDAs, and "national security reasons"?

Because once these attacks become practical enough to matter, the incentives change fast.

Public cryptography research is how defenders prepare.

Secret cryptography research is how attackers get a head start.

And that is not a comfortable place to be.

## 10:25 - The Good News

The good news is that the industry is not completely asleep.

NIST standardized post-quantum algorithms.
Browsers are testing hybrid key exchange.
Cloud providers are experimenting.
Messaging apps are migrating.
Crypto ecosystems are arguing loudly, which is technically their native language.

This is already happening.

The question is whether it happens fast enough.

Because the worst version of Q-Day is not a glowing quantum computer in a villain lab.

It is a boring calendar problem.

The hardware arrives before the migration finishes.

That is why these papers matter.

They did not prove that the internet ends tomorrow.

They made the deadline feel less imaginary.

And in security, imaginary deadlines are how you wake up one morning with a very real incident report.

So will quantum break the world computer?

Eventually, maybe.

But the bigger question is whether we patch the world computer before it gets the chance.
