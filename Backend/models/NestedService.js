import mongoose from 'mongoose';

const nestedServiceNamesEnum = {
  // Women's Salon & Spa
  'Packages': [
    'Bridal Package', 'Party Package', 'Pre-wedding Package', 'Facial Package', 'Hair Spa Package', 'Waxing Package', 'Threading Package', 'Manicure & Pedicure Package'
  ],
  'Blow-dry & style': [
    'Basic Blow-dry', 'Curls Styling', 'Straightening', 'Volume Blow-dry', 'Ironing', 'Crimping', 'Waves Styling', 'Updo Styling'
  ],
  'Cut & style': [
    'Layer Cut', 'Step Cut', 'Bob Cut', 'Pixie Cut', 'Feather Cut', 'U Cut', 'V Cut', 'Fringe Cut'
  ],
  'Trim & style': [
    'Basic Trim', 'Split End Trim', 'Bang Trim', 'Beard Trim', 'Moustache Trim', 'Sideburn Trim', 'Neckline Trim', 'Kids Trim'
  ],
  'Hair care': [
    'Hair Spa', 'Hair Oil Massage', 'Dandruff Treatment', 'Hair Fall Treatment', 'Scalp Treatment', 'Protein Treatment', 'Keratin Mask', 'Hair Repair Mask'
  ],
  'Keratin & botox': [
    'Keratin Treatment', 'Botox Treatment', 'Keratin Spa', 'Botox Spa', 'Keratin Smoothening', 'Botox Smoothening', 'Keratin Rebonding', 'Botox Rebonding'
  ],
  'Hair extensions': [
    'Clip-in Extensions', 'Tape-in Extensions', 'Micro Ring Extensions', 'Fusion Extensions', 'Weft Extensions', 'Halo Extensions', 'Ponytail Extensions', 'Keratin Bond Extensions'
  ],
  'Fashion color': [
    'Global Color', 'Highlights', 'Balayage', 'Ombre', 'Lowlights', 'Root Touchup', 'Streaks', 'Creative Color'
  ],
  'Facials': [
    'Gold Facial', 'Diamond Facial', 'Fruit Facial', 'Anti-aging Facial', 'Acne Facial', 'Brightening Facial', 'Hydrating Facial', 'Cleanup Facial'
  ],
  'Manicure & Pedicure': [
    'Classic Manicure', 'Classic Pedicure', 'French Manicure', 'French Pedicure', 'Gel Manicure', 'Gel Pedicure', 'Spa Manicure', 'Spa Pedicure'
  ],
  'Spa Treatments': [
    'Body Spa', 'Aroma Therapy', 'Swedish Massage', 'Deep Tissue Massage', 'Hot Stone Massage', 'Foot Reflexology', 'Head Massage', 'Back Massage'
  ],
  'Bridal Makeup': [
    'HD Bridal Makeup', 'Airbrush Bridal Makeup', 'Traditional Bridal Makeup', 'Engagement Makeup', 'Reception Makeup', 'Bridal Hairdo', 'Bridal Saree Draping', 'Bridal Trial Makeup'
  ],
  'Threading': [
    'Eyebrow Threading', 'Upper Lip Threading', 'Forehead Threading', 'Chin Threading', 'Full Face Threading', 'Side Threading', 'Neck Threading', 'Cheek Threading'
  ],
  'Waxing': [
    'Full Arms Waxing', 'Full Legs Waxing', 'Underarms Waxing', 'Bikini Waxing', 'Brazilian Waxing', 'Face Waxing', 'Back Waxing', 'Stomach Waxing'
  ],
  // Men's Salon & Spa
  'Haircut': [
    'Basic Haircut', 'Advanced Haircut', 'Kids Haircut', 'Beard Trim with Haircut', 'Haircut with Wash', 'Senior Citizen Haircut', 'Restyle Haircut', 'Express Haircut'
  ],
  'Beard Styling': [
    'Classic Beard Trim', 'Designer Beard', 'Beard Shaping', 'Beard Coloring', 'Beard Wash', 'Goatee Styling', 'French Beard', 'Royal Beard'
  ],
  'Shave': [
    'Classic Shave', 'Luxury Shave', 'Head Shave', 'Beard Shave', 'Hot Towel Shave', 'Cold Shave', 'Express Shave', 'Designer Shave'
  ],
  'Head Massage': [
    'Oil Massage', 'Dry Massage', 'Aroma Massage', 'Champi', 'Pressure Point Massage', 'Relaxing Massage', 'Quick Massage', 'Herbal Massage'
  ],
  'Facial': [
    'Gold Facial', 'Diamond Facial', 'Fruit Facial', 'Anti-aging Facial', 'Acne Facial', 'Brightening Facial', 'Hydrating Facial', 'Cleanup Facial'
  ],
  'Hair Color': [
    'Global Color', 'Highlights', 'Root Touchup', 'Streaks', 'Grey Coverage', 'Creative Color', 'Beard Color', 'Moustache Color'
  ],
  'Body Massage': [
    'Swedish Massage', 'Deep Tissue Massage', 'Hot Stone Massage', 'Foot Reflexology', 'Head Massage', 'Back Massage', 'Aroma Therapy', 'Sports Massage'
  ],
  'D-Tan': [
    'Face D-Tan', 'Body D-Tan', 'Hand D-Tan', 'Leg D-Tan', 'Neck D-Tan', 'Back D-Tan', 'Underarm D-Tan', 'Full Body D-Tan'
  ],
  'Hair Wash': [
    'Basic Wash', 'Anti-dandruff Wash', 'Hydrating Wash', 'Protein Wash', 'Color Protection Wash', 'Scalp Cleansing', 'Herbal Wash', 'Express Wash'
  ],
  // Plumbing Services (ordered to match other services)
  'Basin & sink': [
    'Basin Installation',
    'Sink Unclogging',
    'Tap Leak Fix',
    'Sink Replacement',
    'Waste Pipe Replacement',
    'Basin Mixer Installation',
    'Bottle Trap Cleaning',
    'Overflow Pipe Fix'
  ],
  'Bath fittings': [
    'Towel Hanger Installation', 'Shower Head Replacement', 'Bathroom Shelf Fitting', 'Soap Dispenser Mounting', 'Robe Hook Installation', 'Toothbrush Holder Fitting', 'Towel Rod Replacement', 'Corner Shelf Fitting'
  ],
  'Drainage': [
    'Drain Unclogging',
    'Drain Trap Replacement',
    'Drain Pipe Cleaning',
    'Drain Cover Replacement',
    'Sewer Line Cleaning',
    'Floor Trap Cleaning',
    'Odor Removal',
    'Drainage Inspection'
  ],
  'Grouting': [
    'Tile Grouting (per 10 sq.ft.)',
    'Crack Filling',
    'Wall Grouting',
    'Floor Grouting',
    'Corner Grouting',
    'Shower Area Grouting',
    'Anti-Fungal Grouting',
    'Re-Grouting Old Tiles'
  ],
  'Tap & mixer': [
    'Tap Installation',
    'Mixer Repair',
    'Tap Replacement',
    'Mixer Installation',
    'Tap Cartridge Change',
    'Nozzle Cleaning',
    'Handle Fix',
    'Aerator Replacement'
  ],
  'Toilet': [
    'Toilet Seat Installation',
    'Flush Tank Repair',
    'Toilet Unclogging',
    'Jet Spray Installation',
    'Flush Valve Replacement',
    'Toilet Leak Fix',
    'Wall Hung Toilet Fix',
    'Toilet Seat Tightening'
  ],
  'Water filter': [
    'Water Filter Installation',
    'Water Filter Service',
    'Cartridge Replacement',
    'Leakage Fix',
    'Filter Pipe Replacement',
    'Wall Mounting',
    'Filter Tap Installation',
    'Annual Maintenance'
  ],
  'Water tank': [
    'Water Tank Cleaning',
    'Tank Overflow Pipe Fix',
    'Tank Lid Replacement',
    'Tank Leak Repair',
    'Tank Valve Change',
    'Tank Cleaning (Large)',
    'Tank Disinfection',
    'Tank Pipe Replacement'
  ],
  // Painting Services
  'Interior Painting': [
    'Bedroom Painting', 'Living Room Painting', 'Kitchen Painting', 'Ceiling Painting', 'Accent Wall Painting', 'Kids Room Painting', 'Hallway Painting', 'Bathroom Painting'
  ],
  'Exterior Painting': [
    'Wall Painting', 'Gate Painting', 'Balcony Painting', 'Roof Painting', 'Boundary Wall Painting', 'Garage Painting', 'Shed Painting', 'Facade Painting'
  ],
  'Wall Texturing': [
    'Texture Roller', 'Comb Texture', 'Popcorn Texture', 'Sand Texture', 'Knockdown Texture', 'Venetian Plaster', 'Orange Peel Texture', 'Brushed Texture'
  ],
  'Color Consultation': [
    'Home Color Consultation', 'Office Color Consultation', 'Bedroom Color Advice', 'Living Room Color Advice', 'Kids Room Color Advice', 'Kitchen Color Advice', 'Bathroom Color Advice', 'Accent Wall Color Advice'
  ],
  'Wallpaper Installation': [
    'Vinyl Wallpaper', 'Fabric Wallpaper', 'Textured Wallpaper', '3D Wallpaper', 'Kids Room Wallpaper', 'Living Room Wallpaper', 'Bedroom Wallpaper', 'Bathroom Wallpaper'
  ],
  'Stencils & Designs': [
    'Floral Stencil', 'Geometric Stencil', 'Kids Stencil', 'Border Stencil', 'Ceiling Stencil', 'Accent Wall Stencil', 'Custom Design', 'Theme Design'
  ],
  'Ceiling Painting': [
    'Plain Ceiling', 'Textured Ceiling', 'False Ceiling', 'Pop Ceiling', 'Gypsum Ceiling', 'Wooden Ceiling', 'PVC Ceiling', 'Designer Ceiling'
  ],
  'Metal Painting': [
    'Gate Painting', 'Grill Painting', 'Window Frame Painting', 'Door Painting', 'Furniture Painting', 'Balcony Railing Painting', 'Garage Door Painting', 'Shed Painting'
  ],
  'Wood Polishing': [
    'Furniture Polishing', 'Door Polishing', 'Window Polishing', 'Wardrobe Polishing', 'Table Polishing', 'Chair Polishing', 'Bed Polishing', 'Cabinet Polishing'
  ],
  'Touch-up & Patchwork': [
    'Wall Touch-up', 'Ceiling Touch-up', 'Furniture Touch-up', 'Door Touch-up', 'Window Touch-up', 'Patchwork for Cracks', 'Patchwork for Holes', 'Patchwork for Peeling Paint'
  ],
  // Cleaning Services
  'Home Deep Cleaning': [
    'Full Home Cleaning', 'Kitchen Deep Cleaning', 'Bathroom Deep Cleaning', 'Bedroom Deep Cleaning', 'Living Room Deep Cleaning', 'Balcony Cleaning', 'Window Cleaning', 'Floor Scrubbing'
  ],
  'Sofa Cleaning': [
    'Fabric Sofa Cleaning', 'Leather Sofa Cleaning', 'Recliner Cleaning', 'Sectional Sofa Cleaning', 'Cushion Cleaning', 'Stain Removal', 'Odor Removal', 'Dry Sofa Cleaning'
  ],
  'Carpet Cleaning': [
    'Wall-to-Wall Carpet Cleaning', 'Rug Cleaning', 'Stain Removal', 'Odor Removal', 'Deep Carpet Cleaning', 'Dry Carpet Cleaning', 'Shampooing', 'Vacuuming'
  ],
  'Kitchen Cleaning': [
    'Stove Cleaning', 'Chimney Cleaning', 'Cabinet Cleaning', 'Sink Cleaning', 'Countertop Cleaning', 'Wall Tile Cleaning', 'Floor Cleaning', 'Appliance Cleaning'
  ],
  'Bathroom Cleaning': [
    'Toilet Cleaning', 'Shower Area Cleaning', 'Sink Cleaning', 'Mirror Cleaning', 'Wall Tile Cleaning', 'Floor Cleaning', 'Tap Cleaning', 'Exhaust Fan Cleaning'
  ],
  'Office Cleaning': [
    'Workstation Cleaning', 'Conference Room Cleaning', 'Reception Cleaning', 'Restroom Cleaning', 'Pantry Cleaning', 'Floor Cleaning', 'Window Cleaning', 'Chair Cleaning'
  ],
  'Mattress Cleaning': [
    'Single Mattress Cleaning', 'Double Mattress Cleaning', 'King Mattress Cleaning', 'Queen Mattress Cleaning', 'Stain Removal', 'Odor Removal', 'Deep Cleaning', 'Vacuuming'
  ],
  'Window Cleaning': [
    'Glass Window Cleaning', 'Frame Cleaning', 'Grill Cleaning', 'Sliding Window Cleaning', 'Bay Window Cleaning', 'Stain Removal', 'Odor Removal', 'Vacuuming'
  ],
  'Water Tank Cleaning': [
    'Overhead Tank Cleaning', 'Underground Tank Cleaning', 'Sump Cleaning', 'Plastic Tank Cleaning', 'Concrete Tank Cleaning', 'Disinfection', 'Sludge Removal', 'Inspection'
  ],
  'Floor Scrubbing': [
    'Marble Floor Scrubbing', 'Tile Floor Scrubbing', 'Granite Floor Scrubbing', 'Wooden Floor Scrubbing', 'Vinyl Floor Scrubbing', 'Deep Cleaning', 'Stain Removal', 'Polishing'
  ],
  // Appliance Repair
  'Washing Machine Repair': [
    'Drum Replacement', 'Motor Repair', 'Water Inlet Issue', 'Spin Issue', 'Door Lock Repair', 'Noise Issue', 'Not Draining', 'General Service'
  ],
  'Refrigerator Repair': [
    'Compressor Replacement', 'Gas Filling', 'Thermostat Repair', 'Door Seal Replacement', 'Cooling Issue', 'Noisy Operation', 'Water Leakage', 'General Service'
  ],
  'Microwave Repair': [
    'Magnetron Replacement', 'Turntable Issue', 'Door Switch Repair', 'Heating Issue', 'Display Issue', 'Button Issue', 'Noise Issue', 'General Service'
  ],
  'AC Repair': [
    'Gas Filling', 'Compressor Repair', 'Cooling Issue', 'Water Leakage', 'Remote Issue', 'PCB Repair', 'Fan Motor Repair', 'General Service'
  ],
  'TV Repair': [
    'Screen Replacement', 'Speaker Repair', 'Remote Issue', 'Display Issue', 'Power Issue', 'Sound Issue', 'Wall Mounting', 'General Service'
  ],
  'Chimney Repair': [
    'Filter Cleaning', 'Motor Repair', 'Switch Repair', 'Noise Issue', 'Suction Issue', 'Oil Cleaning', 'Light Issue', 'General Service'
  ],
  'Water Purifier Repair': [
    'Filter Change', 'Leakage Issue', 'UV Lamp Replacement', 'Pump Repair', 'Noise Issue', 'Water Flow Issue', 'General Service', 'Annual Maintenance'
  ],
  'Geyser Repair': [
    'Thermostat Replacement', 'Heating Element Replacement', 'Leakage Issue', 'Power Issue', 'Noise Issue', 'Water Not Heating', 'General Service', 'Annual Maintenance'
  ],
  'Dishwasher Repair': [
    'Spray Arm Issue', 'Drainage Issue', 'Door Lock Repair', 'Water Inlet Issue', 'Noise Issue', 'Not Cleaning Properly', 'General Service', 'Annual Maintenance'
  ],
  'Induction Cooktop Repair': [
    'Coil Replacement', 'Power Issue', 'Display Issue', 'Button Issue', 'Heating Issue', 'Noise Issue', 'General Service', 'Annual Maintenance'
  ],
  // AC Repair and Services
  'AC Installation': [
    'Window AC Installation', 'Split AC Installation', 'Portable AC Installation', 'Ductable AC Installation', 'Cassette AC Installation', 'Multi-Split AC Installation', 'Inverter AC Installation', 'General Installation'
  ],
  'AC Gas Filling': [
    'R22 Gas Filling', 'R32 Gas Filling', 'R410A Gas Filling', 'Top-up Gas', 'Full Gas Filling', 'Leakage Fix', 'Pressure Test', 'General Service'
  ],
  'AC Servicing': [
    'Wet Service', 'Dry Service', 'Filter Cleaning', 'Coil Cleaning', 'Fan Motor Service', 'Remote Check', 'Cooling Test', 'General Service'
  ],
  'AC Repair': [
    'Compressor Repair', 'PCB Repair', 'Fan Motor Repair', 'Remote Issue', 'Cooling Issue', 'Water Leakage', 'Noise Issue', 'General Service'
  ],
  'AC Uninstallation': [
    'Window AC Uninstallation', 'Split AC Uninstallation', 'Portable AC Uninstallation', 'Ductable AC Uninstallation', 'Cassette AC Uninstallation', 'Multi-Split AC Uninstallation', 'Inverter AC Uninstallation', 'General Uninstallation'
  ],
  'AC PCB Repair': [
    'PCB Replacement', 'PCB Soldering', 'PCB Cleaning', 'PCB Testing', 'PCB Component Replacement', 'PCB Wiring', 'PCB Mounting', 'General PCB Repair'
  ],
  'AC Remote Repair': [
    'Remote Battery Change', 'Remote Button Repair', 'Remote Sensor Repair', 'Remote Display Issue', 'Remote Programming', 'Remote Casing Replacement', 'Remote Signal Issue', 'General Remote Repair'
  ],
  'AC Cooling Issue': [
    'Low Cooling', 'No Cooling', 'Uneven Cooling', 'Intermittent Cooling', 'Cooling with Noise', 'Cooling with Water Leakage', 'Cooling with Odor', 'General Cooling Issue'
  ],
  'AC Water Leakage': [
    'Indoor Unit Leakage', 'Outdoor Unit Leakage', 'Pipe Leakage', 'Drain Blockage', 'Condensate Pump Issue', 'Water Tray Issue', 'Sealant Issue', 'General Leakage Fix'
  ],
  'AC Noise Issue': [
    'Fan Noise', 'Compressor Noise', 'Vibration Noise', 'Rattling Noise', 'Buzzing Noise', 'Clicking Noise', 'Humming Noise', 'General Noise Issue'
  ],
  // Electrical Services
  'Wiring': [
    'New Wiring', 'Rewiring', 'Switchboard Wiring', 'Light Point Wiring', 'Fan Point Wiring', 'AC Point Wiring', 'Inverter Wiring', 'Earthing'
  ],
  'Switch Installation': [
    'Modular Switch Installation', 'Non-Modular Switch Installation', 'Dimmer Switch Installation', 'Bell Switch Installation', 'Fan Switch Installation', 'Power Switch Installation', 'Smart Switch Installation', 'General Switch Installation'
  ],
  'Fan Installation': [
    'Ceiling Fan Installation', 'Wall Fan Installation', 'Exhaust Fan Installation', 'Table Fan Installation', 'Pedestal Fan Installation', 'Tower Fan Installation', 'Smart Fan Installation', 'General Fan Installation'
  ],
  'Light Fitting': [
    'LED Light Fitting', 'Tube Light Fitting', 'Chandelier Fitting', 'Panel Light Fitting', 'Spotlight Fitting', 'Cove Light Fitting', 'Wall Light Fitting', 'Outdoor Light Fitting'
  ],
  'Inverter Installation': [
    'Home Inverter Installation', 'Office Inverter Installation', 'Battery Installation', 'Inverter Wiring', 'Inverter Panel Installation', 'Inverter Stand Installation', 'Inverter Earthing', 'General Inverter Installation'
  ],
  'Electrical Repair': [
    'Switch Repair', 'Socket Repair', 'MCB Repair', 'Fuse Repair', 'Wiring Repair', 'Light Repair', 'Fan Repair', 'General Electrical Repair'
  ],
  'MCB & Fuse Repair': [
    'MCB Replacement', 'Fuse Replacement', 'MCB Testing', 'Fuse Testing', 'MCB Wiring', 'Fuse Wiring', 'MCB Mounting', 'General MCB & Fuse Repair'
  ],
  'Geyser Installation': [
    'Instant Geyser Installation', 'Storage Geyser Installation', 'Gas Geyser Installation', 'Solar Geyser Installation', 'Geyser Stand Installation', 'Geyser Pipe Installation', 'Geyser Wiring', 'General Geyser Installation'
  ],
  'Door Bell Installation': [
    'Wired Door Bell Installation', 'Wireless Door Bell Installation', 'Video Door Bell Installation', 'Smart Door Bell Installation', 'Bell Switch Installation', 'Bell Wiring', 'Bell Mounting', 'General Door Bell Installation'
  ],
  'Power Backup Solutions': [
    'Inverter Installation', 'UPS Installation', 'Generator Installation', 'Battery Installation', 'Solar Power Setup', 'Power Backup Wiring', 'Power Backup Panel Installation', 'General Power Backup Solution'
  ],
};

const nestedServiceSchema = new mongoose.Schema({
  subservice: {
    type: String,
    required: true,
    enum: Object.keys(nestedServiceNamesEnum),
  },
  name: {
    type: String,
    required: true,
    // enum removed: dynamic validation is handled in controller
  },
  price: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL or path to the image
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const NestedService = mongoose.model('NestedService', nestedServiceSchema);
export { NestedService, nestedServiceNamesEnum };