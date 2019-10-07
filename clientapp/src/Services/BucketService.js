
class BucketService {

    async CreateBucket() {
        try {
            const res = await fetch("/b/create", {
                method: "POST",
            })
            if (res.ok) {
                const data = await res.json();
                
               // this.setState({ id: data.id })
               // this.setState({ redirect: true })
                return data;
            } else {
                // implement error message...
                return null;
            }
        } catch (error) {
            throw error;
        }
        
    }
}

const bucketservice = new BucketService();
export default bucketservice;
