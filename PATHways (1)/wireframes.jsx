/* PATHways landing-page wireframes — 5 structural variations */

const STAGES = [
  { key: "p", color: "var(--participate)", name: "Participate", emoji: "🧭", sub: "Belong — Start Here", cards: 7 },
  { key: "a", color: "var(--apply)",       name: "Apply",       emoji: "📖", sub: "Grow — Get Equipped",  cards: 12 },
  { key: "x", color: "var(--action)",      name: "Take Action", emoji: "⚡", sub: "Serve — Step In",      cards: 5 },
  { key: "h", color: "var(--help)",        name: "Help Others", emoji: "🤝", sub: "Lead — Reproduce",     cards: 6 },
];

/* ------- shared chrome ------- */
function Nav({ compact }) {
  return (
    <div className="nav">
      <div className="left">
        Christ Church <span style={{color:"#bbb", margin:"0 4px"}}>|</span> <span className="pa">PATHways</span>
      </div>
      {!compact && (
        <div className="center">
          <span>Dashboard</span><span>My Path</span><span>Resources</span><span>Community</span>
        </div>
      )}
      <div className="btn btn-ghost-p" style={{padding:"6px 12px", fontSize:12}}>Profile</div>
    </div>
  );
}

function Footer() {
  return (
    <div style={{
      borderTop:"1.5px solid var(--rule)",
      padding:"18px 28px",
      display:"flex", justifyContent:"space-between",
      fontFamily:'"Kalam", cursive', fontSize:12, color:"var(--ink-soft)"
    }}>
      <div>
        <div style={{color:"var(--participate)", fontWeight:700, fontSize:14}}>Christ Church PATHways</div>
        <div>© 2026 Christ Church.</div>
      </div>
      <div style={{display:"flex", gap:18, alignItems:"center"}}>
        <span>About</span><span>Contact</span><span>Privacy</span>
      </div>
    </div>
  );
}

function Hero({ small }) {
  return (
    <div style={{textAlign:"center", padding: small ? "36px 24px 28px" : "56px 24px 40px", maxWidth:680, margin:"0 auto"}}>
      <div className="pill t-p" style={{marginBottom:14}}>Your Next Step Awaits</div>
      <h1 style={{fontSize: small ? 38 : 46, lineHeight:1.05, marginBottom:10}}>Chart Your Discipleship Journey</h1>
      <div className="meta" style={{maxWidth:520, margin:"0 auto 18px", fontSize:14}}>
        You don't have to figure this out alone. PATHways is Christ Church's guided system — showing you where you are, what's next, and who walks with you.
      </div>
      <div style={{display:"flex", gap:10, justifyContent:"center"}}>
        <div className="btn btn-p">Begin My Journey →</div>
        <div className="btn btn-ghost-p">See How It Works</div>
      </div>
    </div>
  );
}

function ThreeQs() {
  const qs = [
    ["🧭", "Where am I?",         "Understand your current stage of spiritual growth."],
    ["📍", "What's my next step?", "Every stage has a clear, curated set of next actions."],
    ["🤝", "Who walks with me?",  "Mentors, groups, and pastoral care at every stage."],
  ];
  return (
    <div style={{
      borderTop:"1.5px solid var(--rule)",
      borderBottom:"1.5px solid var(--rule)",
      padding:"22px 24px",
      background:"#f6f5ee",
      display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:0,
      maxWidth: "100%",
    }}>
      {qs.map(([e,t,d],i)=>(
        <div key={i} style={{
          padding:"4px 18px",
          borderRight: i<2 ? "1.5px dashed #c8c5b6" : "none",
          textAlign:"center"
        }}>
          <div style={{fontSize:22, marginBottom:6}}>{e}</div>
          <div style={{fontWeight:700, fontSize:14, marginBottom:4}}>{t}</div>
          <div className="meta" style={{fontSize:12}}>{d}</div>
        </div>
      ))}
    </div>
  );
}

function ResourceCard({ title, badge, dim, w="auto" }) {
  return (
    <div className={dim ? "box box-dash" : "box"} style={{
      padding:"12px 12px 14px",
      opacity: dim ? 0.55 : 1,
      minWidth: w,
      display:"flex", flexDirection:"column", gap:6
    }}>
      {badge && <span className="pill t-p" style={{alignSelf:"flex-start", fontSize:10}}>{badge}</span>}
      <div style={{fontFamily:'"Kalam", cursive', fontWeight:700, fontSize:13}}>{title}</div>
      <div className="meta" style={{fontSize:11, lineHeight:1.45}}>
        <span style={{background:"#ece9dc", color:"transparent", borderRadius:3, display:"inline-block", width:"95%", height:8, marginBottom:4}}/>
        <span style={{background:"#ece9dc", color:"transparent", borderRadius:3, display:"inline-block", width:"70%", height:8}}/>
      </div>
      <div style={{
        marginTop:4, fontFamily:'"Kalam", cursive',
        fontWeight:700, fontSize:12, color: dim ? "#999" : "var(--participate)"
      }}>
        {dim ? "COMING SOON →" : "Open →"}
      </div>
    </div>
  );
}

function CardGrid({ count, color, dimLast = 1 }) {
  return (
    <div style={{
      display:"grid",
      gridTemplateColumns:"repeat(auto-fill, minmax(150px, 1fr))",
      gap:10,
      marginTop:10
    }}>
      {Array.from({length: count}).map((_,i)=>(
        <ResourceCard
          key={i}
          badge={i===0 ? "Required" : (i===1 ? "Featured" : null)}
          title={`Resource ${i+1}`}
          dim={i >= count - dimLast}
        />
      ))}
    </div>
  );
}

function ExitGate({ next }) {
  return (
    <div className="box-soft" style={{padding:"10px 12px", marginTop:12}}>
      <div className="label-cap" style={{marginBottom:4}}>To progress → {next}</div>
      <div className="meta" style={{fontSize:11}}>3+ check-ins · finish Membership 101 · connect team follow-up · express interest</div>
    </div>
  );
}

/* ---------- A) VERTICAL SPINE (the spec'd layout) ---------- */
function WireA() {
  return (
    <div className="wire">
      <div className="frame-tag">A · vertical spine</div>
      <Nav/>
      <Hero/>
      <ThreeQs/>
      <div style={{padding:"36px 28px 24px", textAlign:"center"}}>
        <div className="label-cap">The Path Framework</div>
        <h2 style={{fontSize:30, marginTop:4}}>Four stages. One clear path.</h2>
      </div>
      <div style={{padding:"0 36px 32px", maxWidth:880, margin:"0 auto"}}>
        {STAGES.map((s,i)=>(
          <div key={s.key} style={{display:"flex", gap:18, alignItems:"flex-start", position:"relative"}}>
            <div style={{display:"flex", flexDirection:"column", alignItems:"center", flex:"0 0 auto"}}>
              <div className={`node ${s.key}`}>{s.emoji}</div>
              {i < STAGES.length-1 && (
                <div style={{
                  width:3, flex:1, minHeight:120,
                  background:`linear-gradient(to bottom, ${s.color}, ${STAGES[i+1].color})`,
                  margin:"4px 0", borderRadius:2
                }}/>
              )}
            </div>
            <div style={{flex:1, paddingBottom: i<3 ? 28 : 0}}>
              <span className={`pill t-${s.key}`}>{s.name}</span>
              <h3 style={{fontSize:24, color:s.color, marginTop:8}}>{s.name}</h3>
              <div className="label-cap" style={{marginTop:2}}>{s.sub}</div>
              <div className="meta" style={{marginTop:8, maxWidth:520}}>
                Short stage description goes here — 2 lines of body copy explaining what this stage means and what shows up inside it.
              </div>
              <ExitGate next={STAGES[i+1]?.name || "Ongoing"}/>
              <CardGrid count={Math.min(s.cards, 6)} color={s.color}/>
            </div>
          </div>
        ))}
      </div>
      <div style={{background:"#2b322d", color:"#fff", padding:"36px 24px", textAlign:"center"}}>
        <h2 style={{color:"#fff", fontSize:24}}>Not sure where you fit?</h2>
        <div style={{color:"rgba(255,255,255,0.75)", fontSize:13, maxWidth:420, margin:"6px auto 14px", fontFamily:'"Kalam", cursive'}}>
          Our pastoral team is here to help you find your starting point.
        </div>
        <div className="btn btn-p" style={{display:"inline-flex"}}>Talk to a Pastor →</div>
      </div>
      <Footer/>
      <div className="annotate" style={{top: 240, right: 30, width: 140}}>spec'd layout — long scroll, clear sequence</div>
    </div>
  );
}

/* ---------- B) HORIZONTAL STEPPER ---------- */
function WireB() {
  return (
    <div className="wire">
      <div className="frame-tag">B · horizontal stepper</div>
      <Nav/>
      <Hero/>
      <ThreeQs/>
      <div style={{padding:"36px 28px 16px", textAlign:"center"}}>
        <div className="label-cap">The Path Framework</div>
        <h2 style={{fontSize:30, marginTop:4}}>Four stages. One clear path.</h2>
      </div>

      {/* Horizontal stepper */}
      <div style={{padding:"8px 36px 28px", position:"relative"}}>
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(4, 1fr)",
          gap:18,
          position:"relative"
        }}>
          {/* connector line */}
          <div style={{
            position:"absolute", top:22, left:"12%", right:"12%", height:3,
            background:"linear-gradient(to right, var(--participate), var(--apply), var(--action), var(--help))",
            zIndex:0, borderRadius:2
          }}/>
          {STAGES.map((s,i)=>(
            <div key={s.key} style={{position:"relative", zIndex:1, textAlign:"center"}}>
              <div className={`node ${s.key}`} style={{margin:"0 auto"}}>{s.emoji}</div>
              <div style={{marginTop:10, fontWeight:700, color:s.color, fontFamily:'"Caveat", cursive', fontSize:22}}>{s.name}</div>
              <div className="label-cap" style={{fontSize:9}}>{s.sub}</div>
              <div className="meta" style={{fontSize:11, marginTop:6, padding:"0 6px"}}>
                Brief description of what this stage is about — one sentence.
              </div>
            </div>
          ))}
        </div>

        {/* Per-stage card strips */}
        <div style={{marginTop:28, display:"flex", flexDirection:"column", gap:18}}>
          {STAGES.map((s)=>(
            <div key={s.key} className="box" style={{padding:"14px 16px"}}>
              <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8}}>
                <div style={{display:"flex", alignItems:"center", gap:10}}>
                  <span style={{width:14, height:14, borderRadius:"50%", background:s.color, display:"inline-block"}}/>
                  <span style={{fontFamily:'"Caveat", cursive', fontWeight:700, fontSize:20, color:s.color}}>{s.name}</span>
                  <span className={`pill t-${s.key}`}>{s.cards} resources</span>
                </div>
                <span className="meta" style={{fontSize:12}}>see all →</span>
              </div>
              <div style={{
                display:"grid",
                gridTemplateColumns:"repeat(4, 1fr)",
                gap:10
              }}>
                {Array.from({length:4}).map((_,i)=>(
                  <ResourceCard key={i} title={`Resource ${i+1}`} badge={i===0 ? "Required" : null} dim={i===3 && s.key==="p"}/>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{background:"#2b322d", color:"#fff", padding:"32px 24px", textAlign:"center"}}>
        <h2 style={{color:"#fff", fontSize:24}}>Not sure where you fit?</h2>
        <div className="btn btn-p" style={{display:"inline-flex", marginTop:10}}>Talk to a Pastor →</div>
      </div>
      <Footer/>
      <div className="annotate r" style={{top: 470, right: 30, width: 130}}>scannable at a glance — less vertical depth</div>
    </div>
  );
}

/* ---------- C) STAGE SWITCHER (focused view, picks one) ---------- */
function WireC() {
  return (
    <div className="wire">
      <div className="frame-tag">C · stage switcher</div>
      <Nav/>
      <Hero/>
      <ThreeQs/>

      <div style={{padding:"36px 28px 8px", textAlign:"center"}}>
        <div className="label-cap">The Path Framework</div>
        <h2 style={{fontSize:30, marginTop:4}}>Where are you right now?</h2>
        <div className="meta" style={{maxWidth:480, margin:"8px auto 0", fontSize:13}}>
          Pick the stage that fits you best. Your view updates below.
        </div>
      </div>

      {/* Stage tabs */}
      <div style={{
        display:"flex", justifyContent:"center", gap:12, padding:"22px 24px 0", flexWrap:"wrap"
      }}>
        {STAGES.map((s,i)=>(
          <div key={s.key} className="box" style={{
            padding:"10px 16px",
            display:"flex", alignItems:"center", gap:10,
            borderColor: i===1 ? s.color : undefined,
            borderWidth: i===1 ? 2.5 : 1.5,
            background: i===1 ? "rgba(55,158,180,0.06)" : "#fff",
            cursor:"pointer"
          }}>
            <div className={`node ${s.key}`} style={{width:32, height:32, fontSize:14}}>{s.emoji}</div>
            <div>
              <div style={{fontFamily:'"Caveat", cursive', fontWeight:700, fontSize:18, color:s.color}}>{s.name}</div>
              <div className="label-cap" style={{fontSize:9}}>{s.sub.split("—")[0].trim()}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected stage detail */}
      <div style={{padding:"22px 36px 32px", maxWidth: 900, margin:"0 auto"}}>
        <div className="box" style={{padding:"22px 24px", borderColor:"var(--apply)", borderWidth:2.5}}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10}}>
            <div style={{display:"flex", gap:12, alignItems:"center"}}>
              <span className="pill t-a">Apply</span>
              <span className="label-cap">Currently viewing</span>
            </div>
            <span className="meta" style={{fontSize:12}}>Step 2 of 4</span>
          </div>
          <h2 style={{fontSize:28, color:"var(--apply)"}}>Apply — Grow & Get Equipped</h2>
          <div className="meta" style={{marginTop:8, fontSize:13, maxWidth:600}}>
            Commit to growing. Join a Life Group, build spiritual disciplines, and put your faith into practice every week.
          </div>
          <ExitGate next="Take Action"/>
          <div style={{marginTop:14}}>
            <div className="label-cap" style={{marginBottom:8}}>Resources at this stage · 12</div>
            <div style={{
              display:"grid",
              gridTemplateColumns:"repeat(4, 1fr)",
              gap:12
            }}>
              {Array.from({length:8}).map((_,i)=>(
                <ResourceCard key={i} title={`Resource ${i+1}`} badge={i===0 ? "Required" : (i===2 ? "Healing" : null)} dim={i>=6}/>
              ))}
            </div>
            <div style={{textAlign:"center", marginTop:14}}>
              <span className="btn btn-ghost-p" style={{borderColor:"var(--apply)", color:"var(--apply)"}}>Show all 12 resources →</span>
            </div>
          </div>
          <div style={{display:"flex", justifyContent:"space-between", marginTop:18}}>
            <span className="btn">← Participate</span>
            <span className="btn">Take Action →</span>
          </div>
        </div>
      </div>

      <div style={{background:"#2b322d", color:"#fff", padding:"30px 24px", textAlign:"center"}}>
        <h2 style={{color:"#fff", fontSize:22}}>Not sure where you fit?</h2>
        <div className="btn btn-p" style={{display:"inline-flex", marginTop:10}}>Talk to a Pastor →</div>
      </div>
      <Footer/>
      <div className="annotate" style={{top: 460, left: 30, width: 150}}>one focused stage at a time — less overwhelm</div>
    </div>
  );
}

/* ---------- D) JOURNEY MAP (overview grid + zoom) ---------- */
function WireD() {
  return (
    <div className="wire">
      <div className="frame-tag">D · journey map</div>
      <Nav/>

      {/* Compressed hero */}
      <div style={{padding:"32px 28px 18px", textAlign:"center", maxWidth:760, margin:"0 auto"}}>
        <div className="pill t-p" style={{marginBottom:10}}>Your Next Step Awaits</div>
        <h1 style={{fontSize:38, lineHeight:1.05, marginBottom:8}}>Chart Your Discipleship Journey</h1>
        <div className="meta" style={{fontSize:13, maxWidth:520, margin:"0 auto"}}>
          PATHways shows you where you are, what's next, and who walks with you — all on one map.
        </div>
      </div>

      {/* The map */}
      <div style={{padding:"8px 24px 24px"}}>
        <div className="box" style={{padding:"22px 22px 26px", background:"#f9f7ee", position:"relative"}}>
          <div style={{display:"flex", justifyContent:"space-between", marginBottom:14}}>
            <div className="label-cap">The Whole Path · at a glance</div>
            <div className="meta" style={{fontSize:11}}>tap a card to expand</div>
          </div>

          {/* path background svg */}
          <svg viewBox="0 0 1000 80" style={{width:"100%", height:60, display:"block", marginBottom:6}}>
            <path d="M 40 40 Q 200 0, 360 40 T 700 40 T 960 40"
              fill="none" stroke="#bbb" strokeWidth="2" strokeDasharray="4 6"/>
            <circle cx="40"  cy="40" r="10" fill="var(--participate)"/>
            <circle cx="340" cy="40" r="10" fill="var(--apply)"/>
            <circle cx="660" cy="40" r="10" fill="var(--action)"/>
            <circle cx="960" cy="40" r="10" fill="var(--help)"/>
          </svg>

          {/* 4 columns */}
          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(4, 1fr)",
            gap:14
          }}>
            {STAGES.map((s,i)=>(
              <div key={s.key} className="box" style={{
                padding:"14px 14px 16px",
                borderTop: `4px solid ${s.color}`,
                background:"#fff"
              }}>
                <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:6}}>
                  <div className={`node ${s.key}`} style={{width:28, height:28, fontSize:14}}>{s.emoji}</div>
                  <div style={{fontFamily:'"Caveat", cursive', fontWeight:700, fontSize:20, color:s.color}}>{s.name}</div>
                </div>
                <div className="label-cap" style={{fontSize:9, marginBottom:6}}>{s.sub}</div>
                <div className="meta" style={{fontSize:11, marginBottom:10}}>
                  Short stage gist — one sentence summary of the stage.
                </div>
                <div style={{display:"flex", flexDirection:"column", gap:6, marginBottom:8}}>
                  {Array.from({length:3}).map((_,j)=>(
                    <div key={j} style={{
                      display:"flex", justifyContent:"space-between", alignItems:"center",
                      padding:"6px 8px",
                      border:"1px solid #e5e3d6", borderRadius:5,
                      background:"#fbfaf3"
                    }}>
                      <span style={{fontFamily:'"Kalam", cursive', fontSize:11, fontWeight:600}}>Resource {j+1}</span>
                      <span style={{fontSize:11, color:s.color}}>→</span>
                    </div>
                  ))}
                  <div style={{
                    padding:"6px 8px",
                    border:"1px dashed #c0bdac", borderRadius:5,
                    opacity:0.55,
                    fontFamily:'"Kalam", cursive', fontSize:10
                  }}>+ {s.cards - 3} more · 1 coming soon</div>
                </div>
                <div style={{
                  borderTop:"1px dashed #d5d2c1",
                  paddingTop:8,
                  fontSize:10, color:"var(--ink-soft)",
                  fontFamily:'"Kalam", cursive'
                }}>
                  <span style={{fontWeight:700, color:"#444"}}>To progress:</span> {i<3 ? `→ ${STAGES[i+1].name}` : "Ongoing"}
                </div>
              </div>
            ))}
          </div>

          {/* progress indicator */}
          <div style={{marginTop:18, display:"flex", alignItems:"center", gap:10, justifyContent:"center"}}>
            <span className="label-cap">your progress</span>
            <div style={{width:240, height:8, borderRadius:99, background:"#e6e3d3", overflow:"hidden", position:"relative"}}>
              <div style={{width:"35%", height:"100%", background:"linear-gradient(to right, var(--participate), var(--apply))"}}/>
            </div>
            <span className="meta" style={{fontSize:11}}>halfway through Apply</span>
          </div>
        </div>
      </div>

      <ThreeQs/>

      <div style={{background:"#2b322d", color:"#fff", padding:"28px 24px", textAlign:"center"}}>
        <h2 style={{color:"#fff", fontSize:22}}>Not sure where you fit?</h2>
        <div className="btn btn-p" style={{display:"inline-flex", marginTop:10}}>Talk to a Pastor →</div>
      </div>
      <Footer/>
      <div className="annotate r" style={{top: 220, right: 40, width: 160}}>whole path visible above the fold</div>
    </div>
  );
}

/* ---------- E) QUIZ-LED ENTRY ---------- */
function WireE() {
  return (
    <div className="wire">
      <div className="frame-tag">E · quiz-led entry</div>
      <Nav/>

      {/* Hero with quiz card */}
      <div style={{padding:"36px 28px 20px"}}>
        <div style={{display:"grid", gridTemplateColumns:"1.1fr 1fr", gap:28, maxWidth:1000, margin:"0 auto", alignItems:"center"}}>
          <div>
            <div className="pill t-p" style={{marginBottom:12}}>Your Next Step Awaits</div>
            <h1 style={{fontSize:42, lineHeight:1.05, marginBottom:10}}>Find where you are. Take the next right step.</h1>
            <div className="meta" style={{fontSize:14, maxWidth:440, marginBottom:18}}>
              Answer four quick questions and PATHways will show you your stage, your next steps, and who walks with you.
            </div>
            <div style={{display:"flex", gap:10}}>
              <div className="btn btn-p">Take the 60-second quiz →</div>
              <div className="btn btn-ghost-p">Skip · See all stages</div>
            </div>
            <div className="meta" style={{fontSize:11, marginTop:14}}>
              No account needed · 4 questions · ~60 seconds
            </div>
          </div>

          {/* quiz card */}
          <div className="box" style={{padding:"22px 22px 18px", background:"#fff"}}>
            <div style={{display:"flex", justifyContent:"space-between", marginBottom:10}}>
              <span className="label-cap">Question 1 of 4</span>
              <span className="meta" style={{fontSize:11}}>~45s left</span>
            </div>
            <div style={{
              height:6, background:"#eee", borderRadius:99, marginBottom:18, overflow:"hidden"
            }}>
              <div style={{width:"25%", height:"100%", background:"var(--participate)"}}/>
            </div>
            <h3 style={{fontSize:22, marginBottom:14}}>How long have you been at Christ Church?</h3>
            <div style={{display:"flex", flexDirection:"column", gap:8}}>
              {[
                "I'm brand new / haven't visited",
                "A few weeks — still checking it out",
                "Been here a while, attending regularly",
                "Member · serving · committed",
              ].map((t,i)=>(
                <div key={i} className="box" style={{
                  padding:"10px 12px",
                  borderColor: i===2 ? "var(--apply)" : undefined,
                  background: i===2 ? "rgba(55,158,180,0.06)" : "#fff",
                  display:"flex", alignItems:"center", gap:10,
                  fontSize:13, fontFamily:'"Kalam", cursive'
                }}>
                  <span style={{
                    width:18, height:18, borderRadius:"50%",
                    border: i===2 ? "5px solid var(--apply)" : "1.5px solid var(--rule)",
                    flex:"0 0 auto"
                  }}/>
                  {t}
                </div>
              ))}
            </div>
            <div style={{display:"flex", justifyContent:"space-between", marginTop:14}}>
              <span className="btn" style={{opacity:0.5}}>← Back</span>
              <span className="btn btn-p">Next →</span>
            </div>
          </div>
        </div>
      </div>

      {/* preview row */}
      <div style={{padding:"4px 28px 24px"}}>
        <div style={{maxWidth:1000, margin:"0 auto"}}>
          <div className="label-cap" style={{marginBottom:10, textAlign:"center"}}>or browse the whole path</div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:14}}>
            {STAGES.map(s=>(
              <div key={s.key} style={{
                padding:"12px 12px",
                border:"1.5px solid var(--rule)",
                borderRadius:8,
                background:"#fff",
                textAlign:"center"
              }}>
                <div className={`node ${s.key}`} style={{margin:"0 auto 8px", width:34, height:34, fontSize:14}}>{s.emoji}</div>
                <div style={{fontFamily:'"Caveat", cursive', fontWeight:700, fontSize:18, color:s.color}}>{s.name}</div>
                <div className="meta" style={{fontSize:10}}>{s.cards} resources</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ThreeQs/>

      <div style={{background:"#2b322d", color:"#fff", padding:"28px 24px", textAlign:"center"}}>
        <h2 style={{color:"#fff", fontSize:22}}>Prefer to talk it through?</h2>
        <div className="btn btn-p" style={{display:"inline-flex", marginTop:10}}>Talk to a Pastor →</div>
      </div>
      <Footer/>
      <div className="annotate" style={{top: 230, left: 30, width: 150}}>active onboarding instead of a passive scroll</div>
    </div>
  );
}

window.WireA = WireA;
window.WireB = WireB;
window.WireC = WireC;
window.WireD = WireD;
window.WireE = WireE;
