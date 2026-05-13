from manimlib import *


class ECCIntro(Scene):
    def construct(self):
        title = Text("Elliptic Curve Cryptography", font_size=54)
        subtitle = Text("A private number becomes a public point", font_size=32)
        subtitle.next_to(title, DOWN, buff=0.25)
        header = VGroup(title, subtitle).to_edge(UP)

        axes = Axes(
            x_range=(-4, 4, 1),
            y_range=(-3, 3, 1),
            width=9.8,
            height=5.6,
            axis_config={"stroke_color": GREY_B, "stroke_opacity": 0.45},
        )
        axes.shift(DOWN * 0.35)

        curve = axes.get_graph(
            lambda x: 0.13 * x**3 - 1.05 * x,
            x_range=(-3.8, 3.8),
            color=BLUE_C,
            stroke_width=6,
        )

        generator = Dot(axes.c2p(-2.4, 1.04), color=ORANGE)
        generator_label = Text("G", font_size=34, color=ORANGE)
        generator_label.next_to(generator, UP + LEFT, buff=0.14)

        hop_points = [
            (-2.4, 1.04),
            (-1.3, 1.12),
            (0.1, -0.1),
            (1.55, -0.8),
            (2.55, 0.08),
            (3.15, 1.12),
        ]
        public_point = Dot(axes.c2p(*hop_points[0]), color=GREEN)
        public_label = Text("k x G = P", font_size=34, color=GREEN)
        public_label.next_to(public_point, RIGHT, buff=0.2)

        trace = VMobject(color=GREEN, stroke_width=5)
        trace.set_points_smoothly([axes.c2p(*point) for point in hop_points])

        formula = VGroup(
            Text("private", font_size=28, color=YELLOW),
            Text("x", font_size=30),
            Text("generator", font_size=28, color=ORANGE),
            Text("=", font_size=30),
            Text("public point", font_size=28, color=GREEN),
        )
        formula.arrange(RIGHT, buff=0.2).to_edge(DOWN)

        takeaway = Text(
            "Easy to compute forward. Hard to reverse.",
            font_size=40,
            color=YELLOW,
        ).to_edge(DOWN)

        self.play(FadeIn(header, shift=DOWN * 0.25))
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2)
        self.play(FadeIn(generator), Write(generator_label), FadeIn(formula))
        self.play(
            MoveAlongPath(public_point, trace),
            ShowCreation(trace),
            MaintainPositionRelativeTo(public_label, public_point),
            FadeIn(public_label),
            run_time=3,
        )
        self.play(Transform(formula, takeaway), run_time=1)
        self.wait(1)
