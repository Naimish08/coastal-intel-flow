import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <h3 className="font-bold text-lg mb-4">OceanGuard</h3>
                  <p className="text-primary-foreground/80 text-sm">
                    Protecting maritime communities through crowdsourced hazard reporting and real-time analytics.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Platform</h4>
                  <div className="space-y-2 text-sm">
                    <div>Report Hazards</div>
                    <div>Live Map</div>
                    <div>Analytics</div>
                    <div>API Access</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Community</h4>
                  <div className="space-y-2 text-sm">
                    <div>Contributors</div>
                    <div>Guidelines</div>
                    <div>Training</div>
                    <div>Support</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Resources</h4>
                  <div className="space-y-2 text-sm">
                    <div>Documentation</div>
                    <div>API Reference</div>
                    <div>Safety Guidelines</div>
                    <div>Emergency Contacts</div>
                  </div>
                </div>
              </div>
              <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm text-primary-foreground/60">
                <p>&copy; 2024 OceanGuard. Keeping maritime communities safe worldwide.</p>
              </div>
            </div>
    </footer>
  )
}

