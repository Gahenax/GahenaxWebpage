import { NextResponse } from "next/server";
import { GAHENAXCore } from "@/lib/gahenax/oeda";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const system = new GAHENAXCore(body);

    const observation = await system.observe();
    const evaluation = await system.evaluate();

    const entropy_score = Math.random() * 100; // Mock calculation
    const friction_points = ["manual_processes", "conversion_gaps"];

    return NextResponse.json({
      status: "SUCCESS",
      step: evaluation.step,
      entropy_score,
      leak_coordinates: friction_points,
    });
  } catch (error) {
    return NextResponse.json(
      { status: "ERR_ABORT", message: "Incompatible input state" },
      { status: 400 }
    );
  }
}
