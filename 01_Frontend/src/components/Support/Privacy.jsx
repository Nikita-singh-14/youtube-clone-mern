
import { Footer } from '..'

const questions = [
    {
        title: "What information do we collect?",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit tenetur aperiam excepturi deleniti, tempora quidem magni obcaecati quas. Quo perspiciatis, deserunt velit porro ipsum, quod sit ratione cupiditate cumque aperiam dolorem adipisci architecto dolor id quisquam aliquid aspernatur. Repellat, consectetur? At harum necessitatibus nisi rem ullam sapiente laborum eaque? Harumm Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro at iusto laboriosam possimus in! Repellendus ea accusantium omnis impedit incidunt facere fuga consectetur quidem sint dolorem necessitatibus corporis itaque sed qui voluptates amet, sunt fugit? Deleniti explicabo et veniam alias eligendi similique, molestiae ipsa vitae rerum non repudiandae accusamus error temporibus pariatur. Sit totam, odit facilis adipisci ut vitae neque deserunt obcaecati. Laborum labore possimus ipsa quo placeat, tempora voluptatibus commodi itaque quia cupiditate nihil at, porro deleniti totam quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum fuga asperiores voluptatibus quidem dolores, quos officiis nostrum veritatis. A praesentium dicta temporibus vitae, excepturi sequi itaque? Pariatur veniam praesentium error qui necessitatibus. Et autem dolorum consectetur officia, provident quasi soluta?"
    },
    {
        title: "How do we use your information",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit tenetur aperiam excepturi deleniti, tempora quidem magni obcaecati quas. Quo perspiciatis, deserunt velit porro ipsum, quod sit ratione cupiditate cumque aperiam dolorem adipisci architecto dolor id quisquam aliquid aspernatur. Repellat, consectetur? At harum necessitatibus nisi rem ullam sapiente laborum eaque? Harum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro at iusto laboriosam possimus in! Repellendus ea accusantium omnis impedit incidunt facere fuga consectetur quidem sint dolorem necessitatibus corporis itaque sed qui voluptates amet, sunt fugit? Deleniti explicabo et veniam alias eligendi similique, molestiae ipsa vitae rerum non repudiandae accusamus error temporibus pariatur. Sit totam, odit facilis adipisci ut vitae neque deserunt obcaecati. Laborum labore possimus ipsa quo placeat, tempora voluptatibus commodi itaque quia cupiditate nihil at, porro deleniti totam quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum fuga asperiores voluptatibus quidem dolores, quos officiis nostrum veritatis. A praesentium dicta temporibus vitae, excepturi sequi itaque? Pariatur veniam praesentium error qui necessitatibus. Et autem dolorum consectetur officia, provident quasi soluta?"
    },
    {
        title: "Do we use cookies and other tracking technologies?",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum fuga asperiores voluptatibus quidem dolores, quos officiis nostrum veritatis. A praesentium dicta temporibus vitae, excepturi sequi itaque? Pariatur veniam praesentium error qui necessitatibus. Et autem dolorum consectetur officia, provident quasi soluta?"
    },
    {
        title: "How long do we keep tour information?",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum fuga asperiores voluptatibus quidem dolores, quos officiis nostrum veritatis. A praesentium dicta temporibus vitae, excepturi sequi itaque? Pariatur veniam praesentium error qui necessitatibus. Et autem dolorum consectetur officia, provident quasi soluta?"
    },
    {
        title: "How do we keep your information safe?",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum fuga asperiores voluptatibus quidem dolores, quos officiis nostrum veritatis. A praesentium dicta temporibus vitae, excepturi sequi itaque? Pariatur veniam praesentium error qui necessitatibus. Et autem dolorum consectetur officia, provident quasi soluta?"
    },
    {
        title: "What are your privacy rights",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum fuga asperiores voluptatibus quidem dolores, quos officiis nostrum veritatis. A praesentium dicta temporibus vitae, excepturi sequi itaque? Pariatur veniam praesentium error qui necessitatibus. Et autem dolorum consectetur officia, provident quasi soluta?"
    },
    {
        title: "How can you contact us about this policy?",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum fuga asperiores voluptatibus quidem dolores, quos officiis nostrum veritatis. A praesentium dicta temporibus vitae, excepturi sequi itaque? Pariatur veniam praesentium error qui necessitatibus. Et autem dolorum consectetur officia, provident quasi soluta?"
    }
]
const Privacy = () => {
  return (
    <>
            <div className='flex flex-col justify-center items-center bg-gray-800 p-4 gap-4 px-60 min-h-screen'>
                <a className='text-blue-400 cursor-pointer'>Privacy Policy</a>
                <h2 className='text-white text-2xl'>We care about your privacy</h2>
                <p className='text-white'>Your privacy is important to us at videoTube. We repect your privacy regarding any information we may collect from you across out website.
                </p>
                <hr className='w-full text-white m-6' />
                <p className='text-white pb-6'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate facilis officia magni quidem labore obcaecati
                    sequi repellat sit iusto modi doloribus excepturi consectetur, numquam quis. Lorem ipsum dolor sit amet,
                    consectetur adipisicing elit. Nemo voluptatum provident eveniet neque impedit ipsa molestias, animi reiciendis
                    dolorum vitae cumque, itaque quae. Repudiandae obcaecati eaque perferendis fuga amet at?
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad excepturi optio consequuntur quas deleniti sequi
                    laboriosam rem, necessitatibus voluptates modi commodi exercitationem eos expedita repellendus? Quisquam
                    reiciendis illo deleniti, eligendi architecto velit veniam. Odit repudiandae rem, recusandae placeat suscipit
                    non incidunt similique optio facilis quae architecto minus iusto modi natus quod quidem laboriosam unde error
                    explicabo ullam! Enim unde iste, beatae, corrupti, velit animi perferendis nisi maxime dolore qui aliquam.
                </p>

                {
                    questions.map((question) => (
                        <div className='flex flex-col gap-2'>
                            <h2 className='text-white text-2xl'>{question.title}</h2>
                            <p className='text-white'>{question.description}</p>
                        </div>
                    ))
                }





            </div>
            <Footer/>

        </>
  )
}

export default Privacy