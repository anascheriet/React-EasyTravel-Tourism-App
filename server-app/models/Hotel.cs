namespace server_app.models
{
    public class Hotel : Service
    {
        public string Adress { get; set; }
        public string Description { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public int Price { get; set; }
        public bool hasParking { get; set; }
        public bool hasPool { get; set; }
        public bool hasSpa { get; set; }
        public bool hasGym { get; set; }
        public string CreatorName { get; set; }
    }
}