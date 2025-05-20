import { useState, useEffect } from 'react';
import InvitationCard from '@/invitation/InvitationCard';
import BackgroundAnimation from '@/invitation/BackgroundAnimation';
import { useToast } from "@/components/ui/use-toast";

const InvitationPage = () => {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImageAsFile = async () => {
      try {
        const response = await fetch("https://scriveners.pythonabc.org/src/components/images/LitFest25Poster.jpg");
        const blob = await response.blob();
        const file = new File([blob], "LitFest25Poster.jpg", { type: blob.type });
        setSelectedImage(file);
      } catch (err) {
        console.error("Failed to fetch poster image:", err);
      }
    };

    fetchImageAsFile();
  }, []);

  const handleRegister = () => {
    window.location.href = "https://scriveners.pythonabc.org/litfest25";
  };

  const handleShare = () => {
    const messageText = `You're Invited to LitFest 2025! ✨📚

Hey everyone! 🎉
Get ready for a thrilling day of words, wit, and wonder at our annual Literature Day – LitFest 2025! 🖋️🎭

Here's what's waiting for you:
• Parliamentary Debate – Speak your mind, defend your stance! 🗣️
• Treasure Hunt – Solve clues, race time, and claim glory! 🧭
• Spell Bee – Show off your spelling skills, one letter at a time! 🔤
• Open Mic – Poems, stories, or songs – the stage is all yours! 🎙️

Tons of fun, creativity, and exciting prizes await! 🏆🎁

So bring your passion, your team spirit, and your literary flair — and let's make LitFest 2025 a celebration to remember! ✨

Contact us at: 
Vedant Talankar (8839198566) 📞`;

    // Copy text to clipboard first
    navigator.clipboard.writeText(messageText)
      .then(() => {
        toast({
          title: "Copied text to clipboard",
          description: "Image will be shared now. Please paste the text in WhatsApp manually.",
        });
      })
      .catch(() => {
        toast({
          title: "Could not copy text",
          description: "Share image and manually add text.",
          variant: "destructive",
        });
      });

    if (navigator.share) {
      const shareData = {
        title: "LitFest 2025",
        files: selectedImage ? [selectedImage] : undefined,
      };

      // Share image only (text will be copied to clipboard instead)
      navigator.share(shareData)
        .then(() => {
          toast({ title: "Shared successfully!" });
        })
        .catch(err => {
          toast({
            title: "Sharing failed",
            description: "Try again or share manually.",
            variant: "destructive",
          });
        });
    } else {
      toast({
        title: "Sharing not supported",
        description: "Try updating your browser or OS.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="fixed inset-0 bg-[#F5F5DC] bg-opacity-80"></div>
      <BackgroundAnimation />

      <main className="flex-1 flex items-center justify-center p-6 z-10">
        <div className="w-full max-w-lg">
          <InvitationCard
            onRegisterClick={handleRegister}
            onShareClick={handleShare}
          />
        </div>
      </main>

      <footer className="text-center py-4 text-sm text-[#8B4513]/70 z-10">
        <p>© 2025 LitFest - English Department, GGITS & Scriveners Club</p>
      </footer>
    </div>
  );
};

export default InvitationPage;
