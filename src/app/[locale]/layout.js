import { Lato } from "next/font/google";
import "../globals.css";
import FirstNav from "@/components/FirstNav";
import SecondNav from "@/components/SecondNav";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import initTranslations from "../i18n";
import { dir } from "i18next";
import TranslationsProvider from "@/components/TranslationsProvider/TranslationsProvider";
import { getMetadata } from "@/components/getMetadata";

const lato = Lato({
	subsets: ["latin-ext"],
	weight: ["400", "700"], // Specify the weights you want to use
});

export async function generateMetadata() {
	try {
	  const data = await getMetadata()
  
	  return {
		title: "Class A",
		description: "Class A Food Industries",
		icons: {
		  icon: [{
			url: data.logo || "/favicon.ico"
		  }]
		}
	  }
	} catch (error) {
	  return {
		title: "Class A",
		description: "Class A Food Industries",
		icons: {
		  icon: [{
			url: "/favicon.ico"
		  }]
		}
	  }
	}
  
  }

const i18nNamespaces = ["home"];
export default async function RootLayout({ children, params }) {
	const { locale } = params;

	const { resources, t } = await initTranslations(locale, i18nNamespaces);

	return (
		<html lang={locale} dir={dir(locale)}>
			<body className={lato.className}>
				<TranslationsProvider
					namespaces={i18nNamespaces}
					locale={locale}
					resources={resources}
				>
					<section>
						<Header params={params} />
						{children}
						<Footer params={params} />
					</section>
				</TranslationsProvider>
			</body>
		</html>
	);
}
