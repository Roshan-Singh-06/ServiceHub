import mongoose from 'mongoose';

const subServiceCategory = {
  'Women Salon & Spa': [
    'Packages',
    'Blow-dry & style',
    'Cut & style',
    'Trim & style',
    'Hair care',
    'Keratin & botox',
    'Hair extensions',
    'Fashion color',
    'Facials',
    'Manicure & Pedicure',
    'Spa Treatments',
    'Bridal Makeup',
    'Threading',
    'Waxing',
  ],
  "Men's Salon & Spa": [
    'Haircut',
    'Beard Styling',
    'Shave',
    'Head Massage',
    'Facial',
    'Hair Color',
    'Spa Treatments',
    'Body Massage',
    'D-Tan',
    'Hair Wash',
    'Manicure & Pedicure',
  ],
  'Plumbing Services': [
    'Bath fittings',
    'Basin & sink',
    'Grouting',
    'Water filter',
    'Drainage',
    'Toilet',
    'Tap & mixer',
    'Water tank',
  ],
  'Painting Services': [
    'Interior Painting',
    'Exterior Painting',
    'Wall Texturing',
    'Color Consultation',
    'Wallpaper Installation',
    'Stencils & Designs',
    'Ceiling Painting',
    'Metal Painting',
    'Wood Polishing',
    'Touch-up & Patchwork',
  ],
  'Cleaning Services': [
    'Home Deep Cleaning',
    'Sofa Cleaning',
    'Carpet Cleaning',
    'Kitchen Cleaning',
    'Bathroom Cleaning',
    'Office Cleaning',
    'Mattress Cleaning',
    'Window Cleaning',
    'Water Tank Cleaning',
    'Floor Scrubbing',
  ],
  'Appliance Repair': [
    'Washing Machine Repair',
    'Refrigerator Repair',
    'Microwave Repair',
    'AC Repair',
    'TV Repair',
    'Chimney Repair',
    'Water Purifier Repair',
    'Geyser Repair',
    'Dishwasher Repair',
    'Induction Cooktop Repair',
  ],
  'AC Repair and Services': [
    'AC Installation',
    'AC Gas Filling',
    'AC Servicing',
    'AC Repair',
    'AC Uninstallation',
    'AC PCB Repair',
    'AC Remote Repair',
    'AC Cooling Issue',
    'AC Water Leakage',
    'AC Noise Issue',
  ],
  'Electrical Services': [
    'Wiring',
    'Switch Installation',
    'Fan Installation',
    'Light Fitting',
    'Inverter Installation',
    'Electrical Repair',
    'MCB & Fuse Repair',
    'Geyser Installation',
    'Door Bell Installation',
    'Power Backup Solutions',
  ],
};

const subServiceSchema = new mongoose.Schema({
  service: {
    type: String,
    required: true,
    enum: Object.keys(subServiceCategory),
  },
  category: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Robust validation: check if service and category list exist
        if (!this.service || !subServiceCategory[this.service]) {
          // Option 1: skip validation if service is missing or invalid
          return true;
        }
        return subServiceCategory[this.service].includes(v);
      },
      message: props => `${props.value} is not a valid category for ${props.instance.service}`,
    },
  },
  icon: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SubService = mongoose.model('SubService', subServiceSchema);
export { SubService, subServiceCategory };
