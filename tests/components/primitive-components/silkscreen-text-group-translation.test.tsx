import { test, expect } from "bun:test"
import { getTestFixture } from "tests/fixtures/get-test-fixture"

test("SilkscreenText in group translation", () => {
  const { project } = getTestFixture()

  project.add(
    <board width="10mm" height="10mm">
      <group pcbX={2} pcbY={3}>
        <silkscreentext
          text="Test Text"
          pcbX={1}
          pcbY={1}
          fontSize={1.5}
          anchorAlignment="center"
        />
      </group>
    </board>,
  )

  project.render()

  const silkscreenTexts = project.db.pcb_silkscreen_text.list()

  expect(silkscreenTexts.length).toBe(1)
  expect(silkscreenTexts[0].text).toBe("Test Text")
  expect(silkscreenTexts[0].anchor_position.x).toBe(3) // 2 + 1
  expect(silkscreenTexts[0].anchor_position.y).toBe(4) // 3 + 1
  expect(silkscreenTexts[0].font_size).toBe(1.5)
  expect(silkscreenTexts[0].anchor_alignment).toBe("center")
})
