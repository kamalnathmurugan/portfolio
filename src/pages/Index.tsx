import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  Github, 
  Linkedin, 
  ExternalLink,
  Code,
  Database,
  Server,
  Globe,
  Award,
  Calendar,
  Building,
  Send,
  CheckCircle
} from 'lucide-react';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadCV = () => {
    // Download the actual PDF CV file from documents folder
    const link = document.createElement('a');
    link.href = '/uploaded_files/documents/Kamalnath -Software Developer MERN.pdf';
    link.download = 'Kamalnath_Software_Developer_MERN.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Use actual Render deployment URL
      const apiUrl = 'https://portfolio1-xph6.onrender.com/api/contact';
        
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        setSubmitMessage(result.message || 'Error sending message.');
      }
      
    } catch (error) {
      setSubmitMessage('Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(''), 5000);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Enhanced Background Video Effect */}
      <div className="video-background">
        <div className="w-full h-full bg-gradient-to-br from-green-900/80 via-blue-900/60 to-green-800/70 relative overflow-hidden">
          {/* Main Courtallam background */}
          <div className="absolute inset-0">
            <img 
              src="./images/courtallam_panorama_20260108_024456.png" 
              alt="Courtallam Hills" 
              className="w-full h-full object-cover opacity-70"
            />
          </div>
          
          {/* Secondary background layer with cooking scene */}
          <div className="absolute bottom-0 left-0 w-full h-1/3">
            <img 
              src="./images/old_men_cooking_courtallam_20260108_025647.png" 
              alt="Traditional Cooking" 
              className="w-full h-full object-cover opacity-40 mix-blend-overlay"
            />
          </div>
          
          {/* Enhanced Rain effect overlay */}
          <div className="absolute inset-0">
            {[...Array(80)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-12 bg-blue-200/40 rain-effect"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${0.8 + Math.random() * 0.7}s`
                }}
              />
            ))}
          </div>
          
          {/* Enhanced Water flow effect */}
          <div className="absolute bottom-0 left-0 w-full h-40">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-20 bg-blue-300/30 water-flow"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`
                }}
              />
            ))}
          </div>
          
          {/* Mist effect */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-8 h-8 bg-white/10 rounded-full blur-sm"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `waterFlow ${3 + Math.random() * 2}s ease-in-out infinite alternate`
                }}
              />
            ))}
          </div>
          
          {/* Cooking smoke effect */}
          <div className="absolute bottom-20 left-1/4 w-32 h-32">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gray-300/20 rounded-full blur-sm"
                style={{
                  left: `${Math.random() * 100}%`,
                  animation: `fadeInUp ${2 + Math.random()}s ease-out infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Video overlay */}
      <div className="video-overlay" />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-dark py-2' : 'py-4'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-white flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">K</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <Code className="w-2 h-2 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg leading-tight">Portfolio</span>
                <span className="text-xs text-green-300 leading-tight">MERN Developer</span>
              </div>
            </div>
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-white hover:text-green-300 transition-colors capitalize ${
                    activeSection === section ? 'text-green-300 border-b-2 border-green-300' : ''
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
            <Button 
              onClick={downloadCV}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </Button>
          </div>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative z-10">
        <div className="container mx-auto px-6 text-center">
          <div className="fade-in-up">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
              Kamalnath
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Software Engineer specializing in MERN Stack Development
              <br />
              <span className="text-green-300">Fintech • Banking • Payment Systems</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => scrollToSection('projects')}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
              >
                View My Work
              </Button>
              <Button 
                onClick={() => scrollToSection('contact')}
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-green-900 px-8 py-3"
              >
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      {/* Scrolling News Ticker - Top */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-black/20 backdrop-blur-sm border-y border-white/10">
        <div className="ticker-container py-2">
          <div className="ticker-content scroll-left text-white/80 text-sm">
            🚀 MERN Stack Developer • 💼 1.5+ Years Experience • 🏦 Fintech & Banking Expert • 💳 Payment Systems Specialist • 🔒 Secure API Development • 📊 98% Customer Satisfaction • 🌟 Enterprise Solutions • 💻 React.js & Node.js • 🔄 RESTful APIs • 🛡️ OAuth 2.0 & JWT • 📈 40% Performance Improvement • 🎯 Real-time Transaction Systems • 🏆 Award-winning Projects • 🌍 Global Scale Solutions
          </div>
        </div>
      </div>

      <section id="about" className="py-20 relative z-10 mt-8">
        <div className="container mx-auto px-6">
          {/* Scrolling Achievement Ticker */}
          <div className="mb-8 glass-dark rounded-xl p-4">
            <div className="ticker-container">
              <div className="ticker-content scroll-right text-green-300 font-medium">
                ⭐ PayTabs Group Success Story • 🏅 35% Data Accessibility Improvement • 🚀 Paytm Insurance Platform • 💡 Micole Education Innovation • 🔧 API Performance Optimization • 📱 Mobile-First Development • 🌐 Cross-Platform Solutions • 🔐 Security-First Approach • 📊 Data-Driven Results • 🎯 Client-Focused Delivery
              </div>
            </div>
          </div>

          <div className="glass-dark rounded-2xl p-8 md:p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
              About Me
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              <div className="flex flex-col justify-center">
                <div className="glass rounded-xl p-8 h-full flex flex-col justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-green-300/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-12 h-12 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-3">Kamalnath</h3>
                    <p className="text-green-300 text-lg font-medium">MERN Stack Developer</p>
                    <p className="text-white/70 mt-2">Chennai, India</p>
                    
                    {/* Professional Highlights */}
                    <div className="mt-6 space-y-3">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                        <span className="text-white/80 text-sm">Fintech Specialist</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                        <span className="text-white/80 text-sm">Payment Systems Expert</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                        <span className="text-white/80 text-sm">API Architecture</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6 flex flex-col justify-center">
                {/* Detailed Description */}
                <div className="glass rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="w-2 h-2 bg-green-300 rounded-full mr-3"></span>
                    Professional Journey
                  </h4>
                  <p className="text-lg text-white/90 leading-relaxed mb-4">
                    Driven Software Engineer with <strong className="text-green-300">1.5+ years</strong> of experience in 
                    fintech, insurance, and banking domains. I specialize in building secure, scalable payment systems 
                    and high-efficiency RESTful APIs.
                  </p>
                  
                  <p className="text-lg text-white/90 leading-relaxed">
                    My expertise lies in the <strong className="text-green-300">MERN stack</strong> and modern web development, 
                    with a proven track record of delivering innovative solutions for global transaction systems.
                  </p>
                </div>
                
                {/* Key Achievements Scrolling */}
                <div className="glass rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-3">Key Achievements</h4>
                  <div className="ticker-container bg-green-900/20 rounded p-2">
                    <div className="ticker-content scroll-left text-green-300 text-sm">
                      🏆 40% Performance Improvement • 🛡️ 100% Compliance Achievement • 📊 35% Data Accessibility Boost • 🚀 Multi-source Data Integration • 🔒 Enterprise Security Implementation • 🎯 98% Customer Satisfaction • 💳 Payment Gateway Excellence • 🌐 Global Transaction Systems
                    </div>
                  </div>
                </div>
                
                {/* Experience Highlights */}
                <div className="glass rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-3">Experience Highlights</h4>
                  <div className="ticker-container bg-blue-900/20 rounded p-2">
                    <div className="ticker-content scroll-right text-blue-300 text-sm">
                      🏢 PayTabs Group - Payment Gateway Development • 💱 Paytm - Insurance Platform • 🏫 Micole - Education Technology • 🏦 Barclays - Financial Services • 🛡️ Hartford Insurance - Claims Processing • 📊 Data Integration Specialist • 🔧 API Architecture Expert
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="text-center p-4 glass rounded-lg">
                    <div className="text-3xl font-bold text-green-300">1.5+</div>
                    <div className="text-white/80">Years Experience</div>
                  </div>
                  <div className="text-center p-4 glass rounded-lg">
                    <div className="text-3xl font-bold text-green-300">40+</div>
                    <div className="text-white/80">Daily Inquiries</div>
                  </div>
                  <div className="text-center p-4 glass rounded-lg">
                    <div className="text-3xl font-bold text-green-300">98%</div>
                    <div className="text-white/80">Satisfaction Rate</div>
                  </div>
                  <div className="text-center p-4 glass rounded-lg">
                    <div className="text-3xl font-bold text-green-300">35%</div>
                    <div className="text-white/80">Data Accessibility</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Skills Section */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Technical Skills</h3>
              
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="glass border-white/20">
                  <CardHeader className="text-center">
                    <Server className="w-8 h-8 text-green-300 mx-auto mb-2" />
                    <CardTitle className="text-white">Backend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {['Node.js', 'Express.js', 'MongoDB', 'MySQL'].map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-green-600/20 text-green-300">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass border-white/20">
                  <CardHeader className="text-center">
                    <Code className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                    <CardTitle className="text-white">Frontend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {['React.js', 'JavaScript', 'HTML', 'CSS'].map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-blue-600/20 text-blue-300">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass border-white/20">
                  <CardHeader className="text-center">
                    <Globe className="w-8 h-8 text-purple-300 mx-auto mb-2" />
                    <CardTitle className="text-white">API & Integration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {['REST APIs', 'OAuth 2.0', 'JWT'].map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-purple-600/20 text-purple-300">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass border-white/20">
                  <CardHeader className="text-center">
                    <Database className="w-8 h-8 text-orange-300 mx-auto mb-2" />
                    <CardTitle className="text-white">Tools</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {['GitHub', 'Maven', 'Postman', 'Jira'].map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-orange-600/20 text-orange-300">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            Featured Projects
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 - Bookstore */}
            <Card className="glass-dark border-white/20 hover:border-green-300/50 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Code className="w-8 h-8 text-green-300" />
                  <Badge className="bg-green-600/20 text-green-300">E-commerce</Badge>
                </div>
                <CardTitle className="text-white">Bookstore Application</CardTitle>
                <CardDescription className="text-white/70">
                  Full-Stack MERN Application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4">
                  Complete bookstore e-commerce platform with user authentication, book catalog, 
                  shopping cart, and order management system.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['React.js', 'Node.js', 'MongoDB', 'Express.js'].map((tech) => (
                    <Badge key={tech} variant="outline" className="border-green-300/30 text-green-300">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• User authentication & authorization</li>
                  <li>• Book catalog with search & filter</li>
                  <li>• Shopping cart & order management</li>
                  <li>• Admin panel for inventory</li>
                </ul>
                <div className="mt-4 flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-green-300/30 text-green-300 hover:bg-green-300/10"
                    onClick={() => window.open('#', '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Live Demo
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-green-300/30 text-green-300 hover:bg-green-300/10"
                    onClick={() => window.open('https://github.com/kamalnathmurugan/bookstore', '_blank')}
                  >
                    <Github className="w-4 h-4 mr-1" />
                    Code
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-green-300/30 text-green-300 hover:bg-green-300/10"
                    onClick={() => window.open('#bookstore-readme', '_blank')}
                  >
                    📖 README
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Project 2 - Ecommerce Shopez */}
            <Card className="glass-dark border-white/20 hover:border-blue-300/50 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Globe className="w-8 h-8 text-blue-300" />
                  <Badge className="bg-blue-600/20 text-blue-300">E-commerce</Badge>
                </div>
                <CardTitle className="text-white">Ecommerce Shopez</CardTitle>
                <CardDescription className="text-white/70">
                  Modern Shopping Platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4">
                  Modern e-commerce platform with advanced features including product management, 
                  payment integration, and responsive design.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['React.js', 'Redux', 'Node.js', 'Stripe API'].map((tech) => (
                    <Badge key={tech} variant="outline" className="border-blue-300/30 text-blue-300">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Product catalog & categories</li>
                  <li>• Secure payment integration</li>
                  <li>• User profiles & order history</li>
                  <li>• Responsive mobile design</li>
                </ul>
                <div className="mt-4 flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-blue-300/30 text-blue-300 hover:bg-blue-300/10"
                    onClick={() => window.open('#', '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Live Demo
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-blue-300/30 text-blue-300 hover:bg-blue-300/10"
                    onClick={() => window.open('https://github.com/kamalnathmurugan/ecommerceshopez', '_blank')}
                  >
                    <Github className="w-4 h-4 mr-1" />
                    Code
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-blue-300/30 text-blue-300 hover:bg-blue-300/10"
                    onClick={() => window.open('#ecommerce-readme', '_blank')}
                  >
                    📖 README
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Project 3 - BroadSpectrum & Bijlipay */}
            <Card className="glass-dark border-white/20 hover:border-purple-300/50 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img 
                      src="https://www.bijlipay.co.in/favicon.ico" 
                      alt="Bijlipay Logo" 
                      className="w-8 h-8"
                      onError={(e) => {
                        const target = e.currentTarget;
                        const nextElement = target.nextElementSibling as HTMLElement;
                        target.style.display = 'none';
                        if (nextElement) nextElement.style.display = 'block';
                      }}
                    />
                    <Building className="w-8 h-8 text-purple-300" style={{display: 'none'}} />
                  </div>
                  <Badge className="bg-purple-600/20 text-purple-300">Enterprise</Badge>
                </div>
                <CardTitle className="text-white">BroadSpectrum & Bijlipay</CardTitle>
                <CardDescription className="text-white/70">
                  PayTabs Group • Nov 2022 - Nov 2023
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4">
                  Enterprise-grade data integration platform that unified multi-channel payment and finance data, 
                  increasing operational transparency by 35%.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Node.js', 'MongoDB', 'Payment APIs'].map((tech) => (
                    <Badge key={tech} variant="outline" className="border-purple-300/30 text-purple-300">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Improved data processing throughput by 40%</li>
                  <li>• 100% compliance with payment regulations</li>
                  <li>• Multi-source data ingestion system</li>
                </ul>
                <div className="mt-4 flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-purple-300/30 text-purple-300 hover:bg-purple-300/10"
                    onClick={() => window.open('https://www.bijlipay.co.in/', '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Live Site
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-purple-300/30 text-purple-300 hover:bg-purple-300/10"
                    onClick={() => window.open('https://bdp.com.gh/', '_blank')}
                  >
                    <Globe className="w-4 h-4 mr-1" />
                    BDP Ghana
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-purple-300/30 text-purple-300 hover:bg-purple-300/10"
                    onClick={() => window.open('#broadspectrum-readme', '_blank')}
                  >
                    📖 README
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Project 4 - Paytm Insurance */}
            <Card className="glass-dark border-white/20 hover:border-orange-300/50 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img 
                      src="https://paytminsurance.co.in/favicon.ico" 
                      alt="Paytm Insurance Logo" 
                      className="w-8 h-8"
                      onError={(e) => {
                        const target = e.currentTarget;
                        const nextElement = target.nextElementSibling as HTMLElement;
                        target.style.display = 'none';
                        if (nextElement) nextElement.style.display = 'block';
                      }}
                    />
                    <Award className="w-8 h-8 text-orange-300" style={{display: 'none'}} />
                  </div>
                  <Badge className="bg-orange-600/20 text-orange-300">Insurance</Badge>
                </div>
                <CardTitle className="text-white">Paytm Insurance Platform</CardTitle>
                <CardDescription className="text-white/70">
                  Codeavik Technologies • Mar 2022 - Sep 2022
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4">
                  Compliance-focused initiative for Barclaycard to centralize PPI customer data and 
                  streamline regulatory reporting.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['React.js', 'Node.js', 'OAuth 2.0'].map((tech) => (
                    <Badge key={tech} variant="outline" className="border-orange-300/30 text-orange-300">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Secure customer data processing modules</li>
                  <li>• JWT authentication implementation</li>
                  <li>• Enhanced code maintainability</li>
                </ul>
                <div className="mt-4 flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-orange-300/30 text-orange-300 hover:bg-orange-300/10"
                    onClick={() => window.open('https://paytminsurance.co.in/', '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Live Site
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-orange-300/30 text-orange-300 hover:bg-orange-300/10"
                    onClick={() => window.open('#paytm-readme', '_blank')}
                  >
                    📖 README
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Project 5 - Micole */}
            <Card className="glass-dark border-white/20 hover:border-cyan-300/50 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img 
                      src="https://www.micole.net/favicon.ico" 
                      alt="Micole Logo" 
                      className="w-8 h-8"
                      onError={(e) => {
                        const target = e.currentTarget;
                        const nextElement = target.nextElementSibling as HTMLElement;
                        target.style.display = 'none';
                        if (nextElement) nextElement.style.display = 'block';
                      }}
                    />
                    <Globe className="w-8 h-8 text-cyan-300" style={{display: 'none'}} />
                  </div>
                  <Badge className="bg-cyan-600/20 text-cyan-300">Education</Badge>
                </div>
                <CardTitle className="text-white">Micole School Platform</CardTitle>
                <CardDescription className="text-white/70">
                  Freelance • Aug 2024 - Jan 2025
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4">
                  Online platform helping parents find and apply to schools, with comprehensive 
                  school information and admission processes.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['APIs', 'MongoDB', 'Server Optimization'].map((tech) => (
                    <Badge key={tech} variant="outline" className="border-cyan-300/30 text-cyan-300">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Enhanced application performance</li>
                  <li>• Customer issue documentation</li>
                  <li>• Faster loading implementation</li>
                </ul>
                <div className="mt-4 flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-cyan-300/30 text-cyan-300 hover:bg-cyan-300/10"
                    onClick={() => window.open('https://www.micole.net/', '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Live Site
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-cyan-300/30 text-cyan-300 hover:bg-cyan-300/10"
                    onClick={() => window.open('#micole-readme', '_blank')}
                  >
                    📖 README
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Experience Timeline */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Professional Journey</h3>
            
            <div className="glass-dark rounded-2xl p-8">
              <div className="space-y-8">
                {[
                  {
                    period: 'Aug 2024 - Jan 2025',
                    role: 'Freelancer',
                    company: 'Micole (Remote, Spain)',
                    description: 'Developed APIs and enhanced platform performance for school admission system'
                  },
                  {
                    period: 'Nov 2022 - Nov 2023',
                    role: 'Software Engineer',
                    company: 'PayTabs Group (Chennai)',
                    description: 'Developed scalable payment gateway modules and RESTful APIs for e-commerce partners'
                  },
                  {
                    period: 'Mar 2022 - Sep 2022',
                    role: 'Software Engineer',
                    company: 'Paytm - Codeavik Technologies (Noida)',
                    description: 'Built modular frontend and backend components using MERN stack'
                  },
                  {
                    period: 'May 2018 - Sep 2020',
                    role: 'Process Advisor',
                    company: 'Kelly Services - Barclays (Chennai)',
                    description: 'Provided payment protection insurance advisory with 98% satisfaction rate'
                  }
                ].map((exp, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-4 h-4 bg-green-300 rounded-full mt-2"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <h4 className="text-lg font-semibold text-white">{exp.role}</h4>
                        <span className="text-sm text-green-300 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-blue-300 font-medium mb-2">{exp.company}</p>
                      <p className="text-white/70">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="glass-dark rounded-2xl p-8 md:p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
              Get In Touch
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
                <p className="text-lg text-white/80 mb-8">
                  I'm always interested in new opportunities and exciting projects. 
                  Whether you're looking for a dedicated developer or want to discuss 
                  potential collaborations, I'd love to hear from you.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Mail className="w-6 h-6 text-green-300" />
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <a href="mailto:kamalnath.muruga@gmail.com" className="text-green-300 hover:text-green-400">
                        kamalnath.muruga@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Phone className="w-6 h-6 text-green-300" />
                    <div>
                      <p className="text-white font-medium">Phone</p>
                      <a href="tel:+918072287661" className="text-green-300 hover:text-green-400">
                        +91 8072287661
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <MapPin className="w-6 h-6 text-green-300" />
                    <div>
                      <p className="text-white font-medium">Location</p>
                      <p className="text-white/70">Chennai, India</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Linkedin className="w-6 h-6 text-green-300" />
                    <div>
                      <p className="text-white font-medium">LinkedIn</p>
                      <a href="https://linkedin.com/in/kamalnathmuruga" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-400 flex items-center">
                        linkedin.com/in/kamalnathmuruga
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                {/* Contact Form */}
                <div className="glass rounded-xl p-6 mb-6">
                  <h4 className="text-xl font-bold text-white mb-4">Send Message</h4>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-green-300 focus:ring-1 focus:ring-green-300"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-green-300 focus:ring-1 focus:ring-green-300"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Your Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-green-300 focus:ring-1 focus:ring-green-300"
                      />
                    </div>
                    <div>
                      <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-green-300 focus:ring-1 focus:ring-green-300 resize-none"
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <Button 
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 flex items-center space-x-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Send Message</span>
                          </>
                        )}
                      </Button>
                      {submitMessage && (
                        <div className="flex items-center space-x-2 text-green-300">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm">{submitMessage}</span>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
                <div className="glass rounded-xl p-6">
                  <h4 className="text-xl font-bold text-white mb-4">Quick Contact</h4>
                  <div className="space-y-4">
                    <div className="flex space-x-4">
                      <Button 
                        onClick={() => window.open('mailto:kamalnath.muruga@gmail.com', '_blank')}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Send Email
                      </Button>
                      <Button 
                        onClick={() => window.open('tel:+918072287661', '_blank')}
                        variant="outline"
                        className="flex-1 border-white text-white hover:bg-white hover:text-green-900"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </Button>
                    </div>
                    
                    <Separator className="bg-white/20" />
                    
                    <div className="text-center">
                      <p className="text-white/70 mb-4">Download my complete resume</p>
                      <Button 
                        onClick={downloadCV}
                        size="lg"
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Download CV
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 glass rounded-xl p-6">
                  <h4 className="text-lg font-bold text-white mb-3">Availability</h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-300 font-medium">Available for new opportunities</span>
                  </div>
                  <p className="text-white/70 text-sm mt-2">
                    Open to full-time positions and freelance projects
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Bottom Scrolling Ticker */}
      <div className="relative z-10 mb-4">
        <div className="glass-dark rounded-xl mx-6 p-4">
          <div className="ticker-container">
            <div className="ticker-content scroll-left text-white/80 text-sm">
              📞 Contact: kamalnath.muruga@gmail.com • 📱 +91 8072287661 • 📍 Chennai, India • 🔗 LinkedIn: linkedin.com/in/kamalnathmuruga • 💼 Available for Full-time & Freelance • 🌟 Open to New Opportunities • 🚀 Ready to Build Amazing Projects • 🎯 Let's Create Something Great Together • 💫 Innovation Meets Excellence
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-8 relative z-10">
        <div className="container mx-auto px-6">
          <div className="glass-dark rounded-xl p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-white mb-4 md:mb-0">
                <p>&copy; 2025 Kamalnath. All rights reserved.</p>
              </div>
              <div className="flex space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => window.open('https://linkedin.com/in/kamalnathmuruga', '_blank')}
                  className="text-white hover:text-green-300"
                >
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => window.open('mailto:kamalnath.muruga@gmail.com', '_blank')}
                  className="text-white hover:text-green-300"
                >
                  <Mail className="w-5 h-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={downloadCV}
                  className="text-white hover:text-green-300"
                >
                  <Download className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
