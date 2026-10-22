/* Mount the design canvas with all five wireframes */

const { DesignCanvas, DCSection, DCArtboard } = window;

function App() {
  return (
    <DesignCanvas style={{ background: "#efeee8" }}>
      <DCSection id="explorations" title="Structural explorations" subtitle="Pick the framing that feels right; we'll then build it hi-fi to spec.">
        <DCArtboard id="A" label="A · Vertical Spine (per spec)" width={920} height={2600}>
          <WireA/>
        </DCArtboard>
        <DCArtboard id="B" label="B · Horizontal Stepper" width={1100} height={1700}>
          <WireB/>
        </DCArtboard>
        <DCArtboard id="C" label="C · Stage Switcher" width={1100} height={1500}>
          <WireC/>
        </DCArtboard>
        <DCArtboard id="D" label="D · Journey Map" width={1200} height={1450}>
          <WireD/>
        </DCArtboard>
        <DCArtboard id="E" label="E · Quiz-Led" width={1200} height={1400}>
          <WireE/>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
