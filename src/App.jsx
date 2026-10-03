import Hero from './components/Hero';
import Story from './components/Story';
import Banner from './components/Banner';
import Agents from './components/Agents';
import { Experience, Certifications } from './components/Record';
import Builds from './components/Builds';
import { Nav, Contact } from './components/Chrome';

export default function App() {
  return (
    <>
      <a className="skip" href="#about">
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Story />
        <Banner />
        <Agents />
        <Experience />
        <Certifications />
        <Builds />
        <Contact />
      </main>
    </>
  );
}
