module.exports = async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
  const {name,email,interest,size}=req.body||{};
  if(!name||!email)return res.status(400).json({error:'Name and email are required'});
  const apiKey=process.env.RESEND_API_KEY;
  const to=process.env.ACCESS_TO_EMAIL;
  const from=process.env.RESEND_FROM_EMAIL;
  if(!apiKey||!to||!from)return res.status(503).json({error:'Email service is not configured'});
  const safe=value=>String(value||'').replace(/[<>&"']/g,char=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&#39;'}[char]));
  const response=await fetch('https://api.resend.com/emails',{
    method:'POST',
    headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},
    body:JSON.stringify({
      from,to:[to],reply_to:email,subject:'PENROSE — Private access request',
      html:`<h2>Private access request</h2><p><strong>Name:</strong> ${safe(name)}</p><p><strong>Email:</strong> ${safe(email)}</p><p><strong>Interest:</strong> ${safe(interest)}</p><p><strong>Usual size:</strong> ${safe(size)}</p>`
    })
  });
  if(!response.ok)return res.status(502).json({error:'Email delivery failed'});
  return res.status(200).json({ok:true});
}
