import React from 'react'

import "./style.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Flash = () => {
  return (
    <div >
    <section className='flash background'  >
        <div className='container' >
            <div className='heading f_flex' style={{ marginBottom: '100px'}}>
            <h1>DASHBOARD</h1> 
            </div>
            <div style={{ width: '90%',marginLeft: '300px', height: '400px', display:'flex',gap:'10rem'}}>
            <Card sx={{ maxWidth: 345 }} >
              <CardMedia
                component="img"
                alt="red flag"
                height="140"
                image="https://media.licdn.com/dms/image/C5112AQHGQatza15nyA/article-cover_image-shrink_600_2000/0/1520105214111?e=2147483647&v=beta&t=C6wYQELRt-0MFwBShAIJQLv3LSKaYbt2wj1OmMR4U7Q"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Red Flag
                </Typography>
                <Typography variant="body2" color="text.secondary">
                A “red flag” is a fact, event, or set of circumstances, 
                or other information that may indicate a potential legal compliance concern for illegal or unethical business conduct, 
                particularly with regard to corrupt practices and non-compliance with anti-corruption laws.
                </Typography>
              </CardContent>
              <CardActions>
                <a href='https://www.lockheedmartin.com/content/dam/lockheed-martin/eo/documents/ethics/corruption-red-flags.pdf'><Button size="small">Learn More</Button></a>
                
              </CardActions>
            </Card>

            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="Intervention"
                height="140"
                image="https://m.media-amazon.com/images/M/MV5BM2Q1ZmZmNTEtNTE2OC00YTk3LTg2ZmItZTE1ZmQ0MDA3NzRjXkEyXkFqcGdeQXVyNzUwNzg5MTY@._V1_.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Government Intervention
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Government intervention refers to the regulatory action taken by a government that aims to 
                change decisions made by individuals, organizations, or groups regarding economic and social matters. Its primary goal is to maximize a country's social welfare by correcting market failure
                </Typography>
              </CardContent>
              <CardActions>
                <a href='https://www.wallstreetmojo.com/government-intervention/#:~:text=Government%20intervention%20refers%20to%20the,welfare%20by%20correcting%20market%20failure.'><Button size="small">Learn More</Button></a>
                
              </CardActions>
            </Card>
            </div>
        </div>
    </section>
    </div>
  )
}

export default Flash