import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  Shield, 
  FileText, 
  Users, 
  Gavel,
  AlertTriangle,
  Clock,
  Globe
} from "lucide-react";

/**
 * Renders the Terms of Service page, displaying the legal terms and conditions
 * in an accordion format.
 * @returns {JSX.Element} The TermsOfService page component.
 */
const TermsOfService: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <FileText className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Podmínky služby
            </CardTitle>
            <div className="flex justify-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <Clock className="h-3 w-3" />
                Platné od 1.6.2025
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Globe className="h-3 w-3" />
                Verze 1.0
              </Badge>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Tyto podmínky služby určují pravidla používání našich webových 
              služeb a definují práva a povinnosti všech uživatelů.
            </p>
          </CardHeader>
        </Card>

        {/* Important Notice */}
        <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-800 dark:text-amber-200">
            Důležité upozornění
          </AlertTitle>
          <AlertDescription className="text-amber-700 dark:text-amber-300">
            Používáním našich služeb automaticky souhlasíte s těmito podmínkami. 
            Doporučujeme si je pečlivě přečíst před začátkem používání.
          </AlertDescription>
        </Alert>

        {/* Main Content */}
        <Card className="shadow-lg">
          <CardContent className="p-0">
              <Accordion type="single" collapsible className="space-y-4">
                
                <AccordionItem value="introduction" className="border rounded-lg p-4">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-primary" />
                      <span className="text-lg font-semibold">1. Úvodní ustanovení</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-3">
                    <p className="text-muted-foreground leading-relaxed">
                      Vítejte na našich webových stránkách. Tyto podmínky služby 
                      (dále jen "Podmínky") upravují přístup a používání našeho 
                      webu, aplikací a souvisejících služeb provozovaných společností 
                      SlavesOnline.store.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Pokud budete mít jakékoliv dotazy týkající se těchto podmínek, 
                      neváhejte nás kontaktovat před začátkem používání služeb.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="acceptance" className="border rounded-lg p-4">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="text-lg font-semibold">2. Přijetí podmínek</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-3">
                    <p className="text-muted-foreground leading-relaxed">
                      Přístupem na naše webové stránky nebo používáním našich služeb 
                      potvrzujete, že:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>Jste starší 18 let nebo máte souhlas zákonného zástupce</li>
                      <li>Máte právní způsobilost uzavírat závazné smlouvy</li>
                      <li>Souhlasíte s dodržováním těchto podmínek a našich zásad</li>
                      <li>Poskytnuté informace jsou pravdivé a aktuální</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="usage" className="border rounded-lg p-4">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Gavel className="h-5 w-5 text-primary" />
                      <span className="text-lg font-semibold">3. Pravidla používání</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">Povolené použití:</h4>
                      <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                        <li>Legální a etické využívání všech služeb</li>
                        <li>Respektování práv ostatních uživatelů</li>
                        <li>Dodržování všech platných zákonů a předpisů</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">Zakázané činnosti:</h4>
                      <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                        <li>Porušování práv duševního vlastnictví</li>
                        <li>Šíření škodlivého obsahu nebo malwaru</li>
                        <li>Obtěžování nebo diskriminace jiných uživatelů</li>
                        <li>Pokus o neoprávněný přístup k systémům</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="content" className="border rounded-lg p-4">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="text-lg font-semibold">4. Uživatelský obsah a data</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-3">
                    <p className="text-muted-foreground leading-relaxed">
                      Nesete plnou odpovědnost za veškerý obsah, který na náš web 
                      nahrajete, sdílíte nebo jinak zveřejňujete. Udělujete nám 
                      nevýhradní licenci k použití tohoto obsahu pro provoz a 
                      zlepšování našich služeb.
                    </p>
                    <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-900/20">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-700 dark:text-blue-300">
                        Vaše osobní data zpracováváme v souladu s GDPR a našimi 
                        zásadami ochrany osobních údajů.
                      </AlertDescription>
                    </Alert>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="liability" className="border rounded-lg p-4">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-primary" />
                      <span className="text-lg font-semibold">5. Odpovědnost a záruky</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-3">
                    <p className="text-muted-foreground leading-relaxed">
                      Naše služby poskytujeme v podobě "jak jsou" a "jak jsou dostupné". 
                      Vynasnažíme se zajistit spolehlivý provoz, ale nemůžeme garantovat 
                      nepřetržitou dostupnost či bezchybnost.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Naše odpovědnost za škody je omezena na maximální částku, 
                      kterou jste nám zaplatili za služby v posledních 12 měsících.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="termination" className="border rounded-lg p-4">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <span className="text-lg font-semibold">6. Ukončení služeb</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-3">
                    <p className="text-muted-foreground leading-relaxed">
                      Můžete kdykoli ukončit používání našich služeb. Vyhrazujeme 
                      si právo pozastavit nebo ukončit váš přístup při porušení 
                      těchto podmínek nebo podezření na zneužití.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="changes" className="border rounded-lg p-4">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-primary" />
                      <span className="text-lg font-semibold">7. Změny podmínek</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-3">
                    <p className="text-muted-foreground leading-relaxed">
                      Tyto podmínky můžeme čas od času aktualizovat. O významných 
                      změnách vás budeme informovat e-mailem nebo prostřednictvím 
                      oznámení na webu alespoň 30 dní předem.
                    </p>
                  </AccordionContent>
                </AccordionItem>

              </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;