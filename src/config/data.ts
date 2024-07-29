import { ConfirmationTypeEnum } from '@/lib/constants';
import { buildDayJs } from '@/lib/dayjs';

export const data = {
  [ConfirmationTypeEnum.FRIENDS]: {
    title: 'Meu Rolê | Carolina Lira',
    location: 'na minha primeira casinha',
    address:
      'R. Prof. Luis Eulálio de Bueno Vidigal, 137 - Centro, Osasco - SP, 06093-085',
    mapsFrame:
      'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14632.890316887922!2d-46.78829658524168!3d-23.524495629770577!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ceff386a16cb4d%3A0x4db8ae004e82ea96!2sBoulevard%20Parque%20Central!5e0!3m2!1spt-BR!2sbr!4v1721879269057!5m2!1spt-BR!2sbr',
    date: buildDayJs('2024-09-14', '18:00:00'),
  },
  [ConfirmationTypeEnum.FAMILY]: {
    title: 'Meu Chá | Carolina Lira',
    location: 'na casa da minha Vovó',
    address:
      'Av. Manoel Pedro Pimentel, 101 - Continental, Osasco - SP, 06020-194 (Salão de Festas)',
    mapsFrame:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.9086221268853!2d-46.76459238816308!3d-23.535788778729103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ceff9147b1caf9%3A0x6d01be76c4666f13!2sAv.%20Manoel%20Pedro%20Pimentel%2C%20101%20-%20Continental%2C%20Osasco%20-%20SP%2C%2006020-194!5e0!3m2!1spt-BR!2sbr!4v1722232129489!5m2!1spt-BR!2sbr',
    date: buildDayJs('2024-09-01', '13:00:00'),
  },
  credits: [
    {
      title: 'meu papai',
      socialUser: '@alezinlira',
      socialLink: 'https://www.instagram.com/alezinlira/',
    },
    {
      title: 'o tio Gustin',
      socialUser: '@agustinhopneto',
      socialLink: 'https://www.instagram.com/agustinhopneto/',
    },
  ],
  giftsListUrl:
    'https://www.amazon.com.br/baby-reg/amanda-lira-alexsander-lira-novembro-2024-osasco/10OGI99EXGDS8?ref_=cm_sw_r_apin_dp_H0815V8EQ5ABMA0ZGG79&language=en_US',
};
