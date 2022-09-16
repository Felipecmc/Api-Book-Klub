export const emailMessage = (
  clubName: string,
  meetingDate: string,
  meetingHour: string,
  description: string
) => {
  let splitDate = meetingDate.split("/");
  const month = splitDate[0];
  splitDate[0] = splitDate[1];
  splitDate[1] = month;

  const newDate = splitDate.join("/");

  const message = `
  <img src="https://i.ibb.co/C0Sb6cC/book-klub-logo.png"/>
    <h1 style="color:#667ce0;">Uma nova reunião foi agendada em ${clubName}</h1>
    <p style="font-size: 14px">Olá! Uma nova reunião foi agendada para todos os membros de ${clubName} em <strong style="color:#667ce0;">Book Klub</strong>. Visite o clube para mais informações!</p>
    <h2 style="color: #6541c0;">Descrição: ${description}</h2>
    <p style="font-size: 14px; color: #e0669d;">Data: ${newDate}</p>
    <p style="font-size: 14px; color: #e0669d;">Horário: ${meetingHour}</p>
  `;

  return message;
};
