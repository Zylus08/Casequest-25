import React from "react";

// Inline icons to avoid external deps
const Instagram = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const Linkedin = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const ProfileCard = ({ name, role, imageUrl, instagramUrl, linkedinUrl, description }) => {
  return (
    <div
      className="speaker-card overflow-hidden"
      style={{ width: '100%', maxWidth: 288, height: 360, overflow: 'hidden', borderRadius: 16, position: 'relative' }}
    >
      <div
        className="p-6"
        style={{
          height: '100%',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <div className="flex justify-center" style={{ marginTop: '0.25rem', marginBottom: '0.75rem' }}>
          <div className="relative">
            <img
              src={imageUrl || "/api/placeholder/200/200"}
              alt={`${name}'s profile`}
              style={{ width: 132, height: 132, borderRadius: 9999, objectFit: 'cover', border: '4px solid var(--gold)' }}
            />
          </div>
        </div>

        <div className="text-center mb-4" style={{ textAlign: 'center' }}>
          <h3 className="got-heading text-xl font-bold mb-1" style={{ color: 'var(--gold)' }}>{name}</h3>
          <p className="got-subheading font-medium" style={{ color: 'var(--muted)' }}>{role || ""}</p>
        </div>

        {description && (
          <p className="got-subheading text-sm text-center mb-4 line-clamp-2" style={{ color: 'var(--fg)', textAlign: 'center' }}>
            {description}
          </p>
        )}

        {/* Social icons fixed at bottom-center for consistent alignment */}
        <div
          className="flex"
          style={{ gap: '0.75rem', position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 12, alignItems: 'center', justifyContent: 'center' }}
        >
          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link transition-colors p-2 rounded-full"
              aria-label="Instagram profile"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Instagram size={20} />
            </a>
          )}
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link transition-colors p-2 rounded-full"
              aria-label="LinkedIn profile"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Linkedin size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileList = () => {
  const profiles = [
    { name: 'Iqlipse Nova', role: '', imageUrl: 'https://images.genius.com/836f7ae4480071ee6fb53e6ff74e3861.400x400x1.jpg', instagramUrl: 'https://www.instagram.com/iqlipse.nova/', linkedinUrl: 'https://www.linkedin.com/company/iqlipse-nova/', description: 'Indian sensational Singer-songwriter' },
    { name: 'Gaurav Taneja', role: '', imageUrl: 'https://www.startupurban.com/wp-content/uploads/2020/07/gaurav-taneja.jpg', instagramUrl: 'https://www.instagram.com/taneja.gaurav/', linkedinUrl: 'https://www.linkedin.com/in/gauravtaneja/', description: 'Pilot, YouTuber, Motivational Speaker & Fitness Enthusiast' },
    { name: 'Ashneer Grover', role: '', imageUrl: 'https://images.assettype.com/fortuneindia/2022-01/ea0ee46d-8917-44f1-88c8-6e3c4586ea04/Ashneer_Grover_BharatPe.jpg?w=480&h=270&q=60&fit=cover', instagramUrl: 'https://www.instagram.com/ashneer.grover/', linkedinUrl: 'https://www.linkedin.com/in/ashneer/', description: 'Former managing director of BharatPe' },
    { name: 'Aakash Anand', role: '', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJud78RxkaZysWc5DMzfleO7jDHx3fcfQczQ&s', instagramUrl: 'https://www.instagram.com/aakashanand_official/', linkedinUrl: 'https://www.linkedin.com/in/aakashanand/', description: 'CEO of Bella Vita Organic' },
    { name: 'Sony Goyal', role: '', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJfY4TCYsvtb08IKqEx6wQ7JlfFVPvFbnkIw&s', instagramUrl: 'https://www.instagram.com/sonygoyal23/', linkedinUrl: 'https://www.linkedin.com/in/sony-goyal-94662512/', description: 'Director of Mission CAT and founder of Prayaas International School' },
    { name: 'Himesh Madaan', role: '', imageUrl: 'https://www.himeesh.com/wp-content/uploads/2022/06/Himeesh-Banner-for-Mobile.jpg', instagramUrl: 'https://www.instagram.com/himeeshmadaan/?hl=en', linkedinUrl: 'https://www.linkedin.com/in/himeeshmadaan/?originalSubdomain=in', description: 'YouTube Entrepreneur' },
    { name: 'Tanu Jain', role: '', imageUrl: 'https://en-media.thebetterindia.com/uploads/2022/03/WhatsApp-Image-2022-03-29-at-2.00.14-PM-1648554003.jpeg', instagramUrl: 'https://www.instagram.com/dr.tanujain/?hl=en', linkedinUrl: 'https://www.linkedin.com/in/dr-tanu-jain-4aa28a131/?originalSubdomain=in', description: 'Doctor-turned-IAS, educator & motivational speaker' },
    { name: 'Prateek Mittal', role: '', imageUrl: 'https://www.realtynmore.com/wp-content/uploads/2021/01/prateek-mittal-300x300.jpg', instagramUrl: '', linkedinUrl: 'https://www.linkedin.com/in/prateek-mittal-11429322/?originalSubdomain=in', description: 'Executive Director, Sushma Buildtech Limited' },
    { name: 'Arunabh Sinha', role: '', imageUrl: 'https://im.indiatimes.in/content/2024/Jul/Happy-8_669553d2c52bd.jpg?w=1200&h=900&cc=1&webp=1&q=75', instagramUrl: 'https://www.instagram.com/arunabh_yourlaundryguy/?hl=en', linkedinUrl: 'https://www.linkedin.com/in/arunabhsinha/?originalSubdomain=in', description: 'Founder of UClean' },
    { name: 'Ankush Singla', role: '', imageUrl: 'https://cdn.theorg.com/32571f5d-8f93-4c00-addb-29256209475b_medium.jpg', instagramUrl: 'https://www.instagram.com/ankushsingla1/?hl=en', linkedinUrl: 'https://www.linkedin.com/in/ankushsingla/?originalSubdomain=in', description: 'Co-founder and CEO, Coding Ninjas' },
    { name: 'Jaspreet Singh', role: '', imageUrl: 'https://drytickets.com.au/assets/upload/celebrities/671-jaspreet-singh.jpg', instagramUrl: 'https://www.instagram.com/lifeofpaaji/?hl=en', linkedinUrl: '', description: 'Stand-up Comedian' },
    { name: 'Vedant Rusty', role: '', imageUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQHr05qvHZcY-A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1714411546763?e=1764201600&v=beta&t=8XqLQaGmvIBSCdfqSFV6QiTduGttZmGGtDcEqC2w67c', instagramUrl: 'https://www.instagram.com/vedant.rusty/?hl=en', linkedinUrl: 'https://www.linkedin.com/in/vedantrusty/?originalSubdomain=in', description: 'Content & Marketing Educator' },
    { name: 'Sudeep Gupta', role: '', imageUrl: 'https://media.licdn.com/dms/image/v2/D5603AQG5rfA7QIsJHQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1704634205230?e=1764201600&v=beta&t=GO77Cib1-K4K6dqQ2yUlB6cJ8ospz2EpV0YXWBkjbtA', instagramUrl: 'https://www.instagram.com/sudeep__gupta/', linkedinUrl: 'https://in.linkedin.com/in/sudeepgupta1', description: 'Ex-Cars24, Ex-OYO, Co-Founder & CEO' },
    { name: 'Ami Mishra', role: '', imageUrl: 'https://static.toiimg.com/thumb/imgsize-23456,msid-106552259,width-600,resizemode-4/106552259.jpg', instagramUrl: '', linkedinUrl: '', description: 'Indian singer & songwriter' },
    { name: 'Anubhav Singh Bassi', role: '', imageUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_mRNlFKz0e9nYU4KLK6jPSljNauspzslczyHmcwC73ZDR0=s900-c-k-c0x00ffffff-no-rj', instagramUrl: 'https://www.instagram.com/be_a_bassi/?hl=en', linkedinUrl: '', description: 'Stand-up Comedian' },
    { name: 'Anuv Jain', role: '', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Anuv_Jain_at_Ludhiana_concert.jpg', instagramUrl: 'https://www.instagram.com/anuvjain/?hl=en', linkedinUrl: '', description: 'Indian singer-songwriter' },
    { name: 'Tushar Chhabra', role: '', imageUrl: 'https://media.licdn.com/dms/image/v2/C5103AQE0-_ray0M9zw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1565931199134?e=1764201600&v=beta&t=Bm2koKUe8QjTsmsUD0r2jGPLWc3yc6WePCtGRSb3IoQ', instagramUrl: 'https://www.instagram.com/tusharchhabra07/', linkedinUrl: 'https://www.linkedin.com/in/tushar-chhabra-739b1929/', description: 'Founder & CEO, Cron AI' },
    { name: 'Saurabh Goel', role: '', imageUrl: 'https://images.storyboard18.com/storyboard18/2024/12/Saurabh-goel-2024-12-ceadfa502821876f0d8a4244f012362e-1019x573.jpg?impolicy=website&width=738&height=440', instagramUrl: '', linkedinUrl: 'https://www.linkedin.com/in/saurabh-goel-bb0b317/?originalSubdomain=in', description: 'Executive President at Havells India, Ex-CEO NESA at Airtel' },
    { name: 'Ishan Kumar Giddu', role: '', imageUrl: 'https://th.bing.com/th/id/OIP.1xpOUCac-OCYrL-VFlNoTAAAAA?o=7&cb=ucfimg2rm=3&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3' , instagramUrl: 'https://www.instagram.com/ikgiddu/', linkedinUrl: 'https://www.linkedin.com/in/ikgiddu/?originalSubdomain=in', description: 'CEO and Founder of Ikarus 3D' },
    { name: 'Bagish Malhotra', role: '', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9nYt1WU97BrnmaVYeP1LizKV6h3wFjh7rEQ&s', instagramUrl: 'https://www.instagram.com/bagishmalhotra/', linkedinUrl: 'https://www.linkedin.com/in/bagish-malhotra-174a48147/', description: 'Founder Kwabey' },
  ];

  return (
    <div className="min-h-screen bg-transparent">
      <div style={{ width: 'min(1100px, 92%)', margin: '0 auto', padding: '4rem 1rem' }}>
        <div className="text-center mb-8" style={{ textAlign: 'center' }}>
            <h2
                      className="text-7xl md:text-6xl font-bold tracking-tight"
                      style={{
                        color: 'var(--gold)',
                        textAlign: 'center',
                        marginBottom: '1rem',
                        textShadow: '0 2px 8px rgba(0,0,0,0.4)',
                      }}
                    >
                      Past Speakers of TVC
                    </h2>          
                    <p className="max-w-2xl mx-auto text-base font-light" style={{ color: 'var(--muted)' }}>
            Meet our distinguished speakers who shared their insights and experiences at the summit.
          </p>
        </div>
        <div className="speakers-grid">
          {profiles.map((profile, index) => (
            <ProfileCard key={index} {...profile} />
          ))}
        </div>
      </div>
    </div>
  );
};

export { ProfileCard };
export default ProfileList;
