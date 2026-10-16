export type AuriMood = 'idle' | 'observing' | 'moving' | 'explaining' | 'error' | 'success';
export const GUIDE_FIELDS: Record<string, {label:string; text:string}> = {
 name:{label:'Name',text:'Use the name you’d like our team to call you. Two or more characters is enough.'},
 email:{label:'Email address',text:'Use an address you check regularly, for example you@gmail.com. We’ll use it to reply to this submission.'},
 timezone:{label:'Timezone',text:'Your city or timezone helps us collaborate. For example: Asia/Karachi (UTC+5).'},
 portfolio:{label:'Portfolio',text:'Optional: add a complete HTTPS link to your portfolio, GitHub, or a project. It’s fine to leave this blank.'},
 role:{label:'Contribution role',text:'Choose the work you’d most like to contribute. You don’t need to be an expert to apply.'},
 experience:{label:'Experience',text:'Choose the level that feels most accurate. Learning and first contributions are welcome.'},
 stack:{label:'Tools and skills',text:'A short list is perfect: React, Python, Figma, accessibility testing, or technical writing.'},
 hours:{label:'Weekly commitment',text:'Choose time you can comfortably sustain. This is an unpaid volunteer opportunity.'},
 availability:{label:'Availability',text:'Share a few days and times, with your timezone. For example: Tuesday evenings after 7 pm, UTC+5.'},
 motivation:{label:'Motivation',text:'Tell us what connects you to the mission in at least 30 characters. A specific thing you’d like to help with is a good start.'},
 problem:{label:'Problem solving',text:'Describe the problem, what you tried, and what you learned. An idea you’d like to explore is welcome too. At least 30 characters.'},
 collaboration:{label:'Working together',text:'Describe how you ask for help or respond to feedback. A small example in at least 20 characters is enough.'},
 volunteer:{label:'Volunteer acknowledgement',text:'Confirm you understand the role is unpaid. You can discuss your capacity with the team before committing.'},
 consent:{label:'Privacy consent',text:'Read the privacy notice, then confirm the team may review your details and respond. You can ask the team to delete them later.'},
 topic:{label:'Contact topic',text:'Choose the closest match. If your question doesn’t fit, choose Something else.'},
 subject:{label:'Subject',text:'Give your message a specific title, such as “A simpler way to organize research”. At least four characters.'},
 product:{label:'Related product',text:'Choose a product if your message is about it. Otherwise leave this optional field empty.'},
 platform:{label:'Operating system',text:'An operating system and version help us reproduce issues. For example: Ubuntu 24.04 or Android 15.'},
 message:{label:'Message',text:'Tell us what you wanted to do, what happened, and what you expected. At least 30 characters; leave out passwords and private credentials.'},
 'admin-publish':{label:'Publishing content',text:'Save with Published enabled to make this record visible. Turn Published off and save to keep it as a draft.'},
 'admin-save':{label:'Saving edits',text:'Review the preview, then save. Published content updates the live website after the server confirms it was saved.'},
};
export const ROLE_GUIDES: Record<string,string> = {
 'Frontend development':'Build clear, accessible interfaces and connect them to reliable APIs.',
 'Backend development':'Work on APIs, data models, validation, security, and reliable services.',
 'Mobile development':'Shape useful mobile experiences, with thoughtful platform and device testing.',
 'UI/UX design':'Research needs, design flows, and refine interfaces so people can use them confidently.',
 'DevOps & infrastructure':'Help with deployments, monitoring, infrastructure, and dependable releases.',
 'Quality & accessibility':'Test real journeys and improve keyboard and assistive technology support.',
 'Research & writing':'Explore useful questions and turn what we learn into clear documentation.',
 'Community & support':'Listen to users, organize feedback, and help people find the right next step.',
};
export function guideFor(id:string, overrides:Record<string,string>={}) {return overrides[id]?.trim() || GUIDE_FIELDS[id]?.text || 'Explore at your own pace. Ask me whenever you need a hand.';}
export type Rect={left:number;top:number;width:number;height:number};
export function overlaps(a:Rect,b:Rect,gap=8){return a.left<b.left+b.width+gap&&a.left+a.width+gap>b.left&&a.top<b.top+b.height+gap&&a.top+a.height+gap>b.top;}
/** A null position uses a reserved inline slot, never an overlay on controls. */
export function placeGuide(target:Rect,size:{width:number;height:number},viewport:{width:number;height:number;top?:number},obstacles:Rect[]):Rect|null{
 const inset=16,top=viewport.top||0;
 if(viewport.width<1000||target.top+target.height<top||target.top>top+viewport.height)return null;
 const y=Math.max(top+90,Math.min(target.top-12,top+viewport.height-size.height-inset));
 const candidates=[{left:target.left+target.width+24,top:y,...size},{left:target.left-size.width-24,top:y,...size}];
 return candidates.find(r=>r.left>=inset&&r.left+r.width<=viewport.width-inset&&r.top>=top+inset&&r.top+r.height<=top+viewport.height-inset&&!obstacles.some(o=>overlaps(r,o)))||null;
}
