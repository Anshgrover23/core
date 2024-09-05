import { test, expect } from "bun:test"
import { getTestFixture } from "tests/fixtures/get-test-fixture"

test("footprint layout", () => {
  const { circuit } = getTestFixture()

  circuit.add(
    <board width="10mm" height="10mm">
      <chip
        name="U1"
        footprint={
          <footprint>
            <smtpad
              pcbX={0}
              pcbY={0}
              shape="rect"
              width="1mm"
              height="1mm"
              portHints={["pin1"]}
            />
            <smtpad
              pcbX={0}
              pcbY={0}
              shape="rect"
              width="1mm"
              height="1mm"
              portHints={["pin2"]}
            />
            <constraint pcb edgeToEdge xdist="4mm" left=".pin1" right=".pin2" />
          </footprint>
        }
      />
    </board>,
  )

  circuit.render()

  const smtpads = circuit.db.pcb_smtpad.list()

  console.log(smtpads)
  expect(Math.abs(smtpads[0].x - smtpads[1].x)).toBeCloseTo(4, 1)

  expect(circuit.getCircuitJson()).toMatchPcbSnapshot(import.meta.path)
})
